import * as React from "react";
import {BookingModel} from "../../../../base/model/BookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {IBaseMoneyLineChartData, IBaseMoneyLineChartProps, IBaseMoneyLineChartState} from "./BaseMoneyLineChart";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {BarChart, Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import {uniqueArray} from "../../../../base/helper/util";
import {Typography} from "@material-ui/core";
import {dateToString} from "../../../../base/helper/time/dateHelper";

export const RADIAN = Math.PI / 180;

export interface ICategoryPieChartData {
    name: string;
    color: string;
    value: number;
}

export interface ICategoryPieChartProps {
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

export default class CategoryPieChart extends React.Component<ICategoryPieChartProps, ICategoryPieChartState> {
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
                                color: ""
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
        this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
    }

    public renderCustomizedLabel({cx, cy, midAngle, innerRadius, outerRadius, percent, index}: any) {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text key={index} x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                {this.state.currentData[index].name}
            </text>
        );
    };

    public render() {
        const {startDate, endDate} = this.props;
        const {currentData} = this.state;
        return (
            <React.Fragment>
                <Typography variant={"h4"}>
                    {dateToString(startDate) + "-" + dateToString(endDate)}
                </Typography>
                <PieChart width={600} height={600}>
                    {currentData[0] && currentData[0].name &&
                    <Pie dataKey="value"
                         isAnimationActive={false}
                         data={currentData}
                         cx={300}
                         cy={300}
                         labelLine={false}
                         label={this.renderCustomizedLabel}>
                        {
                            currentData.map((entry, index) => <Cell key={index} fill={entry.color}/>)
                        }
                    </Pie>
                    }
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </React.Fragment>
        );
    }
}

