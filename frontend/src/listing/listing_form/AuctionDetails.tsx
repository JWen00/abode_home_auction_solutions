import React from "react";
import { observer } from "mobx-react";
import { action, runInAction } from "mobx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import { DateRange } from "@material-ui/pickers";
import { DateRangeWrapper } from "../../ui/base/input/DateRangeWrapper";
import { InfoPopup } from "../../ui/base/info_popup/InfoPopup";
import { ListingStore } from "../ListingPresenter";
import { createPriceInput } from "../../ui/base/input/PriceFormat";
import { Alert } from "@material-ui/lab";
import NumberFormat from "react-number-format";


const AuctionStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    reserveLabel: {
      marginTop: "15px",
      width: "150px",
      position: "relative",
    },
    infoContainer: {
      position: "absolute",
      width: "40%",
      top: "15px",
      right: "5px",
    },
    dateContainer: {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

export const AuctionDetails: React.FC<{
  store: ListingStore;
  edit: boolean;
}> = observer(({ store, edit }) => {
  const {
    confirmed_auction_start,
    auction_start,
    auction_end,
    reserve_price,
  } = store.auction;

  const PriceInputComponent = (props: NumberFormatCustomProps) => {
    const { inputRef, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        value={reserve_price?.toString()}
        onValueChange={(values) => {
          runInAction(
            () => (store.auction.reserve_price = parseInt(values.value))
          );
        }}
        thousandSeparator
        decimalScale={0}
        isNumericString
        allowNegative={false}
      />
    );
  };


  const handleDateChange = action((value: DateRange<Date>) => {
    const [start, end] = value;
    store.auction.auction_start = start;
    store.auction.auction_end = end;
  });

  const reservePriceInfo =
    " Reserve price is the minimum before the property can be sold. If the highest bidding price does not reach the reservation price, the property is passed in and you may have to negotiate with sellers.";

  // Users cannot edit anything once the auction has begun
  let readOnly = false;
  if (edit && confirmed_auction_start)
    readOnly =
      new Date().getTime() > (confirmed_auction_start as Date).getTime();

  const classes = AuctionStyles();
  return (
    <div className={classes.container}>
      {readOnly && (
        <Alert
          severity="info"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          You cannot edit your Auction Dates and reserve price during your
          auction
        </Alert>
      )}
      <Typography
        variant="subtitle1"
        style={{ marginBottom: "5px", marginTop: "35px" }}
      >
        Property Auction Period
      </Typography>
      {auction_start && auction_end ? (
        <>
          <Paper className={classes.dateContainer}>
            <Typography variant="body1" align="center">
              {auction_start.toDateString()} 9:00AM{" - "}
              {auction_end.toDateString()} 5:00PM
            </Typography>
          </Paper>
          <Button
            style={{ alignContent: "center", marginTop: "10px" }}
            variant="outlined"
            onClick={() => {
              const emptyDate: DateRange<Date> = [null, null];
              handleDateChange(emptyDate);
            }}
            disabled={readOnly}
          >
            Change
          </Button>
        </>
      ) : (
        <DateRangeWrapper onDateChange={handleDateChange} />
      )}
      <div className={classes.reserveLabel}>
        <Typography
          variant="subtitle1"
          style={{ marginBottom: "10px", marginTop: "35px" }}
        >
          Reserve Price
        </Typography>
        <div className={classes.infoContainer}>
          <InfoPopup data={reservePriceInfo} color="#c2c2c2" size="small" />
        </div>
      </div>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          readOnly={readOnly}
          id="outlined-adornment-amount"
          value={reserve_price}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={110}
          inputComponent={PriceInputComponent as any}
        />
      </FormControl>
    </div>
  );
});
