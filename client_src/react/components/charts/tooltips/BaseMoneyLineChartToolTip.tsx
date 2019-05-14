import * as React from "react";
import {TooltipProps} from "recharts";
import ColorField from "../../core/simple/ColorField";
import {Typography} from "@material-ui/core";
import {IBaseMoneyLineChartData} from "../BaseMoneyLineChart";
import {getColoredString, getColorOnBaseOfValue} from "../../tables/default/helper";
import {dateToString} from "../../../../../base/helper/time/dateHelper";

export default class BaseMoneyLineChartToolTip
    extends React.Component<TooltipProps, {}> {

    constructor(props: TooltipProps) {
        super(props);
    }

    public render() {
        const {active} = this.props;
        if (active && this.props.payload) {
            const payload: IBaseMoneyLineChartData = this.props.payload[0].payload;
            return (
                <div className="customTooltip">
                    <Typography variant={"subtitle2"}>{payload.name}</Typography>
                    <Typography variant={"caption"}>{payload.bookingDate}</Typography>
                    <Typography variant={"body1"} style={getColorOnBaseOfValue(payload.value)}>
                        {"Wert: " + getColoredString(payload.value)}
                    </Typography>
                    <Typography variant={"body1"} style={getColorOnBaseOfValue(payload.sumValue)}>
                        {"Gesamt: " + getColoredString(payload.sumValue)}
                    </Typography>
                </div>
            );
        }
        return null;
    }
}
