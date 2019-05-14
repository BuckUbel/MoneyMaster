import * as React from "react";
import {BookingModel} from "../../../../base/model/BookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {IBaseMoneyLineChartData, IBaseMoneyLineChartProps, IBaseMoneyLineChartState} from "./BaseMoneyLineChart";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {Cell, Pie, PieChart, Tooltip} from "recharts";
import {uniqueArray} from "../../../../base/helper/util";

export const RADIAN = Math.PI / 180;

export interface ICategoryPieChartData {
    name: string;
    color: string;
    value: number;
}

export interface ICategoryPieChartProps {
    vBookings: VBookingModel[];
    categories: CategoryModel[];
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
        const {vBookings, categories} = newProps;
        const newCurrentBookings: ICategoryPieChartData[] = vBookings.reduce((a: ICategoryPieChartData[], b) => {
            if (!b.accountId) {
                const i = a.length > 0 ? a.findIndex((g: ICategoryPieChartData) => g.name === String(b.categoryId))
                    : -1;
                if (i === -1) {
                    a.push({name: String(b.categoryId), value: Number(b.value), color: ""});
                } else {
                    a[i].value += Number(b.value);
                }
            }
            return a;
        }, []);
        newCurrentBookings.forEach((ncb, i) => {
            const foundedCat = categories.find((c: CategoryModel) => {
                return (String(c.id) === ncb.name);
            });
            if (foundedCat) {
                ncb.name = foundedCat.name;
                ncb.color = foundedCat.color;
            }
            if (ncb.value > 0) {
                newCurrentBookings[i] = null;
            }
            ncb.value = Number(ncb.value.toFixed(2)) * -1;
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
        const {currentData} = this.state;
        return (
            <React.Fragment>
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
                </PieChart>
            </React.Fragment>
        );
    }
}

