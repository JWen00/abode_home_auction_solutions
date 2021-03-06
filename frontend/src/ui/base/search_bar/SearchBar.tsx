import {
  Button,
  Checkbox,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  FormControl,
  FormControlLabel,
  Typography,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { action } from "mobx";
import * as React from "react";
import { SearchBarStyles } from "./SearchBar.css";
import { SearchStore } from "../../../search/SearchPresenter";
import { observer } from "mobx-react";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DateFnsUtils from "@date-io/date-fns";
import enAULocale from "date-fns/locale/en-AU";
import {
  DateRangePicker,
  DateRangeDelimiter,
  DateRange,
  LocalizationProvider,
} from "@material-ui/pickers";
import { toCamelCase, toSentenceCase } from "../../util/helper";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

/**
 * Search bar component used on the home page
 * @param store
 */
export const SearchBar = observer(({ store }: { store: SearchStore }) => {
  const classes = SearchBarStyles();
  const history = useHistory();
  const onSubmit = () => {
    const {
      input,
      filters: {
        type,
        beds,
        baths,
        cars,
        start_date,
        end_date,
        features,
        landmarks,
        closed_auction,
      },
    } = store;
    let featuresString = features ? features.join("_") : "";
    let landmarksString = landmarks ? landmarks.join("_") : "";

    let searchQuery = !!input ? `query=${input}` : "";
    searchQuery += type ? `&type=${type}` : "";
    searchQuery += beds ? `&beds=${beds}` : "";
    searchQuery += baths ? `&baths=${baths}` : "";
    searchQuery += cars ? `&cars=${cars}` : "";
    searchQuery += start_date ? `&start=${start_date.toISOString()}` : "";
    searchQuery += end_date ? `&end=${end_date.toISOString()}` : "";
    searchQuery += featuresString !== "" ? "&features=" + featuresString : "";
    searchQuery +=
      landmarksString !== "" ? "&landmarks=" + landmarksString : "";
    searchQuery +=
      closed_auction === "true"
        ? `&include_closed_auctions=true`
        : `&include_closed_auctions=false`;

    history.push("/search?" + searchQuery);
  };
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <div>
      <form onSubmit={onFormSubmit} className={classes.form}>
        <SearchInputWrapper store={store} />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.formButton}
        >
          Search
        </Button>
      </form>
      <div>
        <SearchFilterWrapper store={store} />
      </div>
    </div>
  );
});

/**
 * Wrapper for the search bar
 * @param store
 */
const SearchInputWrapper = ({ store }: { store: SearchStore }) => {
  const [value, setValue] = React.useState(store.input);
  const classes = SearchBarStyles();
  const onChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
    store.input = event.target.value;
    setValue(event.target.value);
  });
  return (
    <TextField
      id="Search"
      value={value}
      onChange={onChange}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      fullWidth
      placeholder="Search for a location"
      className={classes.textInput}
    />
  );
};

/**
 * Search filters
 * @param store
 */
const SearchFilterWrapper = ({ store }: { store: SearchStore }) => {
  const classes = SearchBarStyles();
  console.log(store.shouldShowFilter)
  const [showing, setShowing] = React.useState(store.shouldShowFilter);

  const [bedsFilter, setBedFilter] = React.useState(store.filters.beds);
  const [bathsFilter, setBathsFilter] = React.useState(store.filters.baths);
  const [carFilter, setCarFilter] = React.useState(store.filters.cars);

  const onBedChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
    setBedFilter(event.target.value as number);
    (store as any).filters.beds = event.target.value;
  });

  const onBathChange = action(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setBathsFilter(event.target.value as number);
      (store as any).filters.baths = event.target.value;
    }
  );

  const onCarChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
    (store as any).filters.cars = event.target.value;
    setCarFilter(store.filters.cars);
  });

  return (
    <div>
      <Button
        className={classes.filterDropdown}
        onClick={() => (showing ? setShowing(false) : setShowing(true))}
      >
        Advanced Search
      </Button>
      <div
        className={classes.filters}
        style={{ display: showing ? "flex" : "none" }}
      >
        <div className={classes.filterRows}>
          <TypePicker store={store} />
          <NumberPicker
            store={store}
            value={bedsFilter}
            onChange={onBedChange}
            label="Beds"
            isCarPicker={false}
          />
          <NumberPicker
            store={store}
            value={bathsFilter}
            onChange={onBathChange}
            label="Baths"
            isCarPicker={false}
          />
          <NumberPicker
            store={store}
            value={carFilter}
            onChange={onCarChange}
            label="Cars"
            isCarPicker={true}
          />
          <div className={classes.dateInput} style={{ flex: 4 }}>
            <LocalizationProvider
              dateAdapter={DateFnsUtils}
              locale={enAULocale}
            >
              <MinMaxDateRangePicker store={store} />
            </LocalizationProvider>
          </div>
        </div>
        <div className={classes.filterRows}>
          <FeaturePicker store={store} />
          <LandmarkPicker store={store} />
          <ClosedAuctionsPicker store={store} />
        </div>
      </div>
    </div>
  );
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**
 * Type picker component used to select house type
 * @param store
 */
export function TypePicker(props: { store: SearchStore }) {
  const classes = SearchBarStyles();

  const [typeFilter, setTypeFilter] = React.useState(props.store.filters.type);

  const onTypeChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeFilter(event.target.value as string);
    props.store.filters.type =
      event.target.value === "" ? undefined : event.target.value;
  });

  return (
    <FormControl
      className={classes.formControl}
      size="small"
      variant="outlined"
      style={{ flex: 1 }}
    >
      <InputLabel id="type-label">Type</InputLabel>
      <Select
        value={typeFilter}
        onChange={(event: any) => onTypeChange(event)}
        labelId="type-label"
        label="Type"
      >
        <MenuItem value={""}><em>None</em></MenuItem>
        <MenuItem value={"house"}>House</MenuItem>
        <MenuItem value={"apartment"}>Apartment</MenuItem>
        <MenuItem value={"townhouse"}>Townhouse</MenuItem>
        <MenuItem value={"studio"}>Studio</MenuItem>
        <MenuItem value={"duplex"}>Duplex</MenuItem>
      </Select>
    </FormControl>
  );
}

/**
 * Component to select beds, baths, cards
 * @param store
 * @param value
 * @param onChange
 * @param label
 */
export function NumberPicker(props: {
  store: SearchStore;
  value: any;
  onChange: any;
  label: String;
  isCarPicker: boolean;
}) {
  const classes = SearchBarStyles();

  return props.isCarPicker ? (
    <TextField
      className={classes.formControl}
      size="small"
      variant="outlined"
      style={{ flex: 1 }}
      value={props.value}
      onChange={props.onChange}
      type="number"
      InputProps={{
        inputProps: { min: 0, max: 10 },
        onKeyDown: (event) => {
          if (
            !(
              (event.keyCode >= 48 && event.keyCode <= 57) ||
              event.keyCode === 8 ||
              event.keyCode === 9
            )
          )
            event.preventDefault();
        },
      }}
      label={props.label}
    />
  ) : (
    <TextField
      className={classes.formControl}
      size="small"
      variant="outlined"
      style={{ flex: 1 }}
      value={props.value}
      onChange={props.onChange}
      type="number"
      InputProps={{
        inputProps: { min: 1, max: 10 },
        onKeyDown: (event) => {
          if (
            !(
              (event.keyCode >= 49 && event.keyCode <= 57) ||
              event.keyCode === 8 ||
              event.keyCode === 9
            )
          )
            event.preventDefault();
        },
      }}
      label={props.label}
    />
  );
}

/**
 * Component to pick features for filters
 * @param store
 */
export function FeaturePicker(props: { store: SearchStore }) {
  // Options for picker
  const features = [
    "Ensuite",
    "Built In wardrobe",
    "Bathtub",
    "Furnished",
    "Open kitchen",
    "Separate kitchen",
    "Island kitchen",
    "Gas stove",
    "Electric stove",
    "Induction stove",
    "Balcony",
    "Ocean view",
    "Bbq",
    "Porch",
    "Pool",
    "Gym",
  ];

  const classes = SearchBarStyles();

  const [featureFilters, setFeatureFilter] = React.useState(
    (props.store.filters.features || []).map((f) => {
      return toSentenceCase(f);
    })
  );
  const onChange = action((event: React.ChangeEvent<{}>, values: string[]) => {
    props.store.filters.features = values.map((feature) =>
      toCamelCase(feature.toLowerCase())
    );
    setFeatureFilter(props.store.filters.features);
  });

  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={2}
      defaultValue={featureFilters}
      style={{ flex: 1 }}
      id="features-checkboxes"
      options={features}
      disableCloseOnSelect
      onChange={onChange}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      className={classNames(classes.formControl, classes.selectControl)}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Features" />
      )}
    />
  );
}

/**
 * Component to pick landmarks for filters
 * @param store
 */
export function LandmarkPicker(props: { store: SearchStore }) {
  // Options for picker
  const landmarks = [
    "Primary School",
    "Secondary School",
    "Train Station",
    "Park",
  ];

  const classes = SearchBarStyles();

  const [landmarkFilters, setLandmarkFilter] = React.useState(
    (props.store.filters.landmarks || []).map((f) => {
      return toSentenceCase(f);
    })
  );

  const onChange = action((event: React.ChangeEvent<{}>, values: string[]) => {
    props.store.filters.landmarks = values.map((landmark) =>
      toCamelCase(landmark.toLowerCase())
    );
    setLandmarkFilter(props.store.filters.landmarks);
  });

  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={2}
      defaultValue={landmarkFilters}
      style={{ flex: 1 }}
      id="landmarks-checkboxes"
      options={landmarks}
      disableCloseOnSelect
      onChange={onChange}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      className={classNames(classes.formControl, classes.selectControl)}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Landmarks" />
      )}
    />
  );
}

/**
 * Component to pick auction start and end date for filters
 * @param store
 */
export function MinMaxDateRangePicker(props: { store: SearchStore }) {
  const [value, setValue] = React.useState<DateRange<Date>>([
    props.store.filters.start_date || null,
    props.store.filters.end_date || null,
  ]);

  const nullDateRange: DateRange<Date> = [null, null];

  const onChange = (newValue: DateRange<Date>) => {
    props.store.filters.start_date = newValue[0] ? newValue[0] : undefined;
    props.store.filters.end_date = newValue[1] ? newValue[1] : undefined;
    setValue(newValue);
  };

  return (
    <DateRangePicker
      value={value}
      onChange={onChange}
      renderInput={(startProps: any, endProps: any) => (
        <React.Fragment>
          <TextField
            {...startProps}
            size="small"
            fullWidth
            style={{ backgroundColor: "white" }}
            helperText={undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setValue(nullDateRange)}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <DateRangeDelimiter> to </DateRangeDelimiter>
          <TextField
            {...endProps}
            fullWidth
            size="small"
            style={{ backgroundColor: "white" }}
            helperText={undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setValue(nullDateRange)}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </React.Fragment>
      )}
    />
  );
}

/**
 * Component to include closed auctions for filters
 * @param store
 */
export function ClosedAuctionsPicker(props: { store: SearchStore }) {
  const classes = SearchBarStyles();

  const [closedAuction, setClosedAuction] = React.useState(
    props.store.filters.closed_auction
  );

  const onChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
    setClosedAuction(event.target.checked === true ? "true" : "false");
    props.store.filters.closed_auction =
      event.target.checked === true ? "true" : "false";
  });

  return (
    <FormControl
      className={classes.formControl}
      size="small"
      variant="outlined"
      style={{ flex: 1, background: "none" }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={closedAuction === "true" ? true : false}
            onChange={onChange}
            name="Closed Auction"
            color="primary"
            style={{ paddingLeft: "20px" }}
          />
        }
        label={
          <Typography variant="body2" color="textSecondary">
            Include Closed Auctions
          </Typography>
        }
      />
    </FormControl>
  );
}
