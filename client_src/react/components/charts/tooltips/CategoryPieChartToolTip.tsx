import * as React from "react";
import {TooltipProps} from "recharts";
import ColorField from "../../core/simple/ColorField";
import {Typography} from "@material-ui/core";
import {IBaseMoneyLineChartData} from "../BaseMoneyLineChart";
import {ICategoryPieChartData} from "../CategoryPieChart";

export default class CategoryPieChartToolTip
    extends React.Component<TooltipProps, {}> {

    constructor(props: TooltipProps) {
        super(props);
    }
    public render() {
        const {active} = this.props;
        if (active && this.props.payload) {
            const payload: ICategoryPieChartData = this.props.payload[0].payload;

            return (
                <div className="customTooltip">
                    <Typography variant={"subtitle2"}>{payload.name}</Typography>
                    <ColorField color={payload.color} className={"inlineBlock"}/>
                    <Typography variant={"body1"} className={"inlineText"}>{payload.value}</Typography>
                </div>
            );
        }
        return null;
    }
}
