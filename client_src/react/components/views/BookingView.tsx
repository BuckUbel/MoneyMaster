import * as React from "react";
import {
  arrayToBookingModel,
  bookingFields,
  BookingModel,
  IBookingIdentity,
} from "../../../../base/model/BookingModel";
import Button from "@material-ui/core/Button";
import BookingTable from "../tables/BookingTable";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {Divider, Grid, Typography} from "@material-ui/core";
import {getStringValues} from "../../../../base/helper/util";

export interface IBookingViewProps {
  bookings: BookingModel[];
  fetchAllBookings: () => Promise<any>;
  addBookings: (bookings: IBookingIdentity[]) => Promise<any>;
  editBookings: (bookings: IBookingIdentity[]) => Promise<any>;
}

export interface IBookingViewState {
  uploadThing: any;
  upload: BookingModel[];
}

const defaultState: IBookingViewState = {
  uploadThing: {},
  upload: [],
};

export default class BookingView extends React.Component<IBookingViewProps, IBookingViewState> {

  public state: IBookingViewState = defaultState;

  constructor(props: IBookingViewProps) {
    super(props);
    this.loadForTable = this.loadForTable.bind(this);
    this.resetMonth = this.resetMonth.bind(this);
    this.onChangeFileInput = this.onChangeFileInput.bind(this);
    this.setUploadField = this.setUploadField.bind(this);
    this.extractBookingsFromFile = this.extractBookingsFromFile.bind(this);
  }

  public componentDidMount() {
    this.loadForTable();
  }

  public loadForTable() {
    this.props.fetchAllBookings()
      .then(() => {
          console.log("Success");
        },
      )
      .catch(() => {
        console.log("Error");
      });
  }

  public extractBookingsFromFile(event: any) {
    const {bookings} = this.props;
    const elements: string[] = event.target.result.split("\n");
    elements.pop();
    const categories = getStringValues(elements[0], ";");
    elements.shift();

    const newBookings = elements.map((el: string): BookingModel => {
      return arrayToBookingModel(getStringValues(el, ";"), categories);
    });

    const updateBookings: BookingModel[] = [];
    const reallyNewBookings = newBookings.filter((newBooking) => {

      // let isContained = false;
      return bookings.every((oldBooking) => {
        const bookingStatus = oldBooking.equals(newBooking);
        if (bookingStatus === "ignore") {
          // isContained = true;
          return false;
        }
        if (bookingStatus === "update") {
          updateBookings.push(newBooking);
          // isContained = true;
          return false;
        }
        return true;
      });
      // if every is "add"
      // return !isContained;
    });

    this.props.addBookings(reallyNewBookings)
      .then(() => {
        // return this.props.editBookings(updateBookings);
      }).then(() => {
      console.log("Success");
    }).catch((err) => {
      console.log("Error: " + err);
    });
    // this.setState({upload: reallyNewBookings});
  }

  public onChangeFileInput(files: FileList) {

    // TODO: Hochladen der Datei
    //
    // --> Lesen der Datei
    //
    // Überprüfen jedes Eintrages oob er existiert und wenn nicht dann, wird er erstellt
    // --> Nur Einträge, welche nach dem max-Datum sind, werden zugelassen
    // --> max- Datum: wird bei jedem Insert gesetzt auf den vorherigen Tag

    const fr = new FileReader();
    fr.onload = this.extractBookingsFromFile;
    fr.readAsText(files[0]);
  }

  public resetMonth() {
    this.setState(defaultState);
  }

  public setUploadField(ref: any) {
    this.setState({
      uploadThing: ref
    });
  }

  public render() {
    const {bookings} = this.props;
    const {uploadThing} = this.state;
    let nowValue = 0;
    if (bookings.length > 0) {
      nowValue = bookings.map((b) => {
        return b.value;
      }).reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      });
    }
    return (
      <Grid item xs={12} container spacing={24}>
        {/*<Grid item>*/}
        <Grid key={1} item xs={12} container spacing={16}>
          <Grid item key={1}>
            <Button onClick={this.loadForTable} color={"primary"} variant={"contained"}> Tabelle laden</Button>
          </Grid>
          <Grid item key={2}>
            <input id="myInput" type="file" ref={this.setUploadField} style={{display: "none"}} onChange={(e) => {
              this.onChangeFileInput(e.target.files);
            }}/>
            <Button color={"secondary"} variant={"contained"} className={"roundButton menuToggleButton"}
                    onClick={(e) => {
                      uploadThing.click();
                    }}>
              <CloudUploadIcon/>
            </Button>
          </Grid>
          <Grid item key={3}>
            <Typography component={"h2"}>
              {nowValue.toFixed(2) + " €"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} key={2}>
          <Divider variant={"middle"}/>
        </Grid>
        <Grid item xs={12} container spacing={32} key={3}>
          <BookingTable bookings={bookings}/>
        </Grid>
      </Grid>
    );
  }
}
