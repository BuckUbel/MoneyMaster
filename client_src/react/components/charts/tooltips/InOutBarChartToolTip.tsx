import * as React from "react";
import {TooltipProps} from "recharts";
import ColorField from "../../core/simple/ColorField";
import {Typography} from "@material-ui/core";
import {IBaseMoneyLineChartData} from "../BaseMoneyLineChart";
import {IInOutBarChartData} from "../InOutBarChart";
import {getColoredString, getColorOnBaseOfValue} from "../../tables/default/helper";

export default class InOutBarChartToolTip
    extends React.Component<TooltipProps, {}> {

    constructor(props: TooltipProps) {
        super(props);
    }

    public render() {
        const {active} = this.props;
        if (active && this.props.payload) {
            const payload: IInOutBarChartData = this.props.payload[0].payload;
            return (
                <div className="customTooltip">
                    <Typography variant={"subtitle2"}>{payload.name}</Typography>
                    <Typography variant={"body1"} style={getColorOnBaseOfValue(payload.posValue)}>
                        {"Einnahmen: " + getColoredString(payload.posValue)}
                    </Typography>
                    <Typography variant={"body1"} style={getColorOnBaseOfValue(payload.negValue * -1)}>
                        {"Ausgaben: " + getColoredString(payload.negValue * -1)}
                    </Typography>
                </div>
            );
        }
        return null;
    }
}
