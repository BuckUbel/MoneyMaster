import * as React from "react";
import {BookingModel} from "../../../../base/model/BookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import {Typography} from "@material-ui/core";
import {dateToString} from "../../../../base/helper/time/dateHelper";
import {RouteComponentProps, withRouter} from "react-router";
import {getRouteByName} from "../router/Routes";
import CategoryPieChartToolTip from "./tooltips/CategoryPieChartToolTip";

export interface ICategoryPieChartData {
    name: string;
    color: string;
    value: number;
    categoryId: number;
}

export interface ICategoryPieChartProps extends RouteComponentProps {
    vBookings: VBookingModel[];
    categories: CategoryModel[];
    bookings: BookingModel[];
    startDate: Date;
    endDate: Date;
}

export interface ICategoryPieChartState {
    currentData: ICategoryPieChartData[];
}

export const defaultState: ICategoryPieChartState = {
    currentData: []
};

class CategoryPieChart extends React.Component<ICategoryPieChartProps, ICategoryPieChartState> {
    public static getDerivedStateFromProps(
        newProps: ICategoryPieChartProps,
        oldState: ICategoryPieChartState): ICategoryPieChartState {

        const {currentData} = oldState;
        const {vBookings, categories, bookings, startDate, endDate} = newProps;

        const newCurrentBookings: ICategoryPieChartData[] = vBookings.reduce(
            (vBArray: ICategoryPieChartData[], currentVB) => {
                if (!currentVB.accountId) {
                    const foundedBooking = bookings.find((booking: BookingModel) => {
                        return (currentVB.bookingId === booking.id);
                    });
                    if (foundedBooking
                        && foundedBooking.bookingDate.getTime() > startDate.getTime()
                        && foundedBooking.bookingDate.getTime() < endDate.getTime()) {
                        const i = vBArray.length > 0 ? vBArray.findIndex(
                            (g: ICategoryPieChartData) => g.name === String(currentVB.categoryId)) : -1;
                        if (i === -1) {
                            vBArray.push({
                                name: String(currentVB.categoryId),
                                value: Number(currentVB.value),
                                color: "",
                                categoryId: 0,
                            });
                        } else {
                            vBArray[i].value += Number(currentVB.value);
                        }
                    }
                }
                return vBArray;
            }, []);
        newCurrentBookings.forEach((ncVBooking, index) => {
            const foundedCat = categories.find((category: CategoryModel) => {
                return (String(category.id) === ncVBooking.name);
            });
            if (foundedCat) {
                // insert category values
                ncVBooking.name = foundedCat.name;
                ncVBooking.color = foundedCat.color;
                ncVBooking.categoryId = foundedCat.id;
            }
            if (ncVBooking.value > 0) {
                newCurrentBookings[index] = null;
            }
            ncVBooking.value = Number(ncVBooking.value.toFixed(2)) * -1;
        });
        return {currentData: newCurrentBookings.filter((el) => el !== null)};
    }

    public state: ICategoryPieChartState = defaultState;

    constructor(props: ICategoryPieChartProps) {
        super(props);
    }

    public render() {
        const {startDate, endDate, history} = this.props;
        const {currentData} = this.state;
        return (
            <React.Fragment>
                <Typography variant={"h4"}>
                    {dateToString(startDate) + "-" + dateToString(endDate) + " Ausgaben Übersicht"}
                </Typography>
                <PieChart width={600} height={600}>
                    {currentData[0] && currentData[0].name &&
                    <Pie dataKey="value"
                         isAnimationActive={false}
                         data={currentData}
                         cx={300}
                         cy={300}
                         stroke={"#303030"}
                         labelLine={false}
                         label={false}
                         onClick={(a: any) => {
                             history.push(getRouteByName("CategoryPage").pathWithoutParams + a.payload.categoryId);
                         }}
                    >
                        {
                            currentData.map((entry, index) => <Cell key={index} fill={entry.color}/>)
                        }
                    </Pie>
                    }
                    <Tooltip content={<CategoryPieChartToolTip/>}/>
                    <Legend layout={"horizontal"}/>
                </PieChart>
            </React.Fragment>
        );
    }
}

export default withRouter(CategoryPieChart);
