import * as React from "react";
import {
  arrayToBookingModel,
  bookingFields,
  BookingModel,
  IBookingIdentity, IDBCol,
} from "../../model/BookingModel";
import Button from "@material-ui/core/Button";
import BookingTable from "../tables/BookingTable";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {Divider, Grid} from "@material-ui/core";
import {getStringValues} from "../../helper/util";

export interface IBookingViewProps {
  bookings: BookingModel[];
  fetchAllBookings: () => Promise<any>;
  fetchBookingsForGantt: (from: Date, to: Date) => Promise<any>;
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
    const categories = getStringValues(elements[0], ";");
    elements.shift();
    console.log(Object.keys(bookingFields).map((fieldName: string) => {
      return bookingFields[fieldName];
    }));

    const newBookings = elements.map((el: string): BookingModel => {
      return arrayToBookingModel(getStringValues(el, ";"), categories);
    });
    console.log(newBookings);
    const filteredNewBookings = newBookings.filter((booking) => {
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].equals(booking)) {
          return false;
        }
      }
      return true;
    });

    this.setState({upload: filteredNewBookings});
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
