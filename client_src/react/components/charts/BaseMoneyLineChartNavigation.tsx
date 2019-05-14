import * as React from "react";
import {Button, Grid} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {changeDateMonthLastDay} from "../../../../base/helper/time/dateHelper";
import DateTextField from "../core/simple/DateTextField";

export interface IBaseMoneyLineCharNavigationProps {
    changeCurrentDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
    switchLeft: () => void;
    switchRight: () => void;
    resetNavigation: () => void;
    currentFromMonth: Date;
    currentToMonth: Date;
    firstDayOfActivities: Date;
    lastDayOfActivities: Date;
}

export default class BaseMoneyLineCharNavigation extends React.Component<IBaseMoneyLineCharNavigationProps, {}> {

    constructor(props: IBaseMoneyLineCharNavigationProps) {
        super(props);
    }

    public render() {
        const {
            switchLeft,
            switchRight,
            currentFromMonth,
            currentToMonth,
            changeCurrentDate,
            resetNavigation,
            firstDayOfActivities,
            lastDayOfActivities,
        } = this.props;

        return (
            <Grid item xs={12} container justify={"space-between"} alignItems={"center"} spacing={8}>
                <Grid item lg={5} sm={12} container alignItems={"center"} justify={"center"}>
                    <Grid item xs={6} className={"centeringGrid"} container alignItems={"center"}
                          justify={"space-between"}>
                        <DateTextField
                            name={"startDate"}
                            label={"Startdatum"}
                            value={currentFromMonth}
                            min={firstDayOfActivities}
                            max={currentToMonth}
                            onChange={changeCurrentDate}
                            textFieldProps={{required: true}}
                        />
                    </Grid>
                    <Grid item xs={6} className={"centeringGrid"} container alignItems={"center"} justify={"center"}>
                        <DateTextField
                            name={"endDate"}
                            label={"Enddatum"}
                            value={currentToMonth}
                            min={currentFromMonth}
                            max={changeDateMonthLastDay(lastDayOfActivities, 1)}
                            onChange={changeCurrentDate}
                            textFieldProps={{required: true}}
                        />
                    </Grid>
                </Grid>
                <Grid item lg={2} sm={5} container alignItems={"center"} justify={"center"}>
                    <Grid item xs={6} className={"centeringGrid"} container alignItems={"center"}
                          justify={"space-between"}>
                        <Button
                            onClick={switchLeft}
                            aria-label={"zurück"}
                            size={"medium"}
                            variant={"contained"}
                            color={"primary"}>
                            <ChevronLeftIcon/>
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={"centeringGrid"} container alignItems={"center"}
                          justify={"space-between"}>
                        <Button
                            onClick={switchRight}
                            aria-label={"vorwärts"}
                            size={"medium"}
                            variant={"contained"}
                            color={"primary"}>
                            <ChevronRightIcon/>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item lg={5} sm={7} container justify={"space-between"} spacing={8}>
                    <Grid item xs={12} md={4}>
                        <Button onClick={resetNavigation} size={"medium"} variant={"outlined"} color={"secondary"}>
                            <p>Zurücksetzen</p>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
