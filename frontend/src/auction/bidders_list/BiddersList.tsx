import * as React from "react";
import { BidderTag } from "../../ui/base/bidder_tag/BidderTag";
import { biddersListStyle } from "./BiddersList.css";
import { Typography, Divider } from "@material-ui/core";
import { observer } from "mobx-react";
import { ErrorBoundaryComponent } from "../../ui/base/error_boundary/ErrorBoundary";

/**
 * List of bidders in the auction and marks the tag of the current user
 * @param bidders
 * @param currentUser
 */
export const BiddersList = observer(
  ({ bidders, currentUser }: { bidders: number[]; currentUser?: number }) => {
    const classes = biddersListStyle();
    return (
      <ErrorBoundaryComponent>
        <div>
          <Typography variant="h5">Bidders</Typography>
          <Divider className={classes.divider} />
          {bidders.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              Currently, there are no bidders.
            </Typography>
          )}
          {bidders.map((bidder, i) => (
            <div key={i} className={classes.bidderContainer}>
              <BidderTag bidderNumber={bidder} />
              <div className={classes.you}>
                {currentUser === bidder && (
                  <Typography variant="body1">You</Typography>
                )}
              </div>
            </div>
          ))}
        </div>
      </ErrorBoundaryComponent>
    );
  }
);
