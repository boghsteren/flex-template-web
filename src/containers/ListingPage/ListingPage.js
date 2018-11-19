/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { array, arrayOf, bool, func, shape, string, oneOf } from "prop-types";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import config from "../../config";
import routeConfiguration from "../../routeConfiguration";
import {
  LISTING_STATE_PENDING_APPROVAL,
  LISTING_STATE_CLOSED,
  propTypes
} from "../../util/types";
import { types as sdkTypes } from "../../util/sdkLoader";
import {
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  createSlug,
  parse
} from "../../util/urlHelpers";
import { formatMoney } from "../../util/currency";
import {
  createResourceLocatorString,
  findRouteByRouteName
} from "../../util/routes";
import {
  ensureListing,
  ensureOwnListing,
  ensureUser,
  userDisplayName
} from "../../util/data";
import { richText } from "../../util/richText";
import { getMarketplaceEntities } from "../../ducks/marketplaceData.duck";
import {
  manageDisableScrolling,
  isScrollingDisabled
} from "../../ducks/UI.duck";
import {
  Page,
  NamedLink,
  NamedRedirect,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Button,
  Logo
} from "../../components";
import { TopbarContainer, NotFoundPage } from "../../containers";

import { sendEnquiry, loadData, setInitialValues } from "./ListingPage.duck";
import SectionImages from "./SectionImages";
import SectionAvatar from "./SectionAvatar";
import SectionHeading from "./SectionHeading";
import SectionDescription from "./SectionDescription";
import SectionFeatures from "./SectionFeatures";
import SectionReviews from "./SectionReviews";
import SectionHost from "./SectionHost";
import SectionRulesMaybe from "./SectionRulesMaybe";
import SectionMapMaybe from "./SectionMapMaybe";
import SectionBooking from "./SectionBooking";
import css from "./ListingPage.css";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE = 16;

const { UUID } = sdkTypes;

if (typeof window == "undefined") {
  global.window = new Object();
}

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`
    };
  }
  return {};
};

const createPDF = name => {
  const input = document.getElementById("pdf");
  html2canvas(input, { useCORS: true }).then(canvas => {
    const pdf = new jsPDF();
    pdf.addImage(canvas, "JPEG", 0, 0);
    pdf.save(`${name}.pdf`);
  });
};

const openBookModal = (history, listing) => {
  if (!listing.id) {
    // Listing not fully loaded yet
    return;
  }
  const routes = routeConfiguration();
  history.push(
    createResourceLocatorString(
      "ListingPage",
      routes,
      { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
      { book: true }
    )
  );
};

const closeBookModal = (history, listing) => {
  if (!listing.id) {
    // Listing not fully loaded yet
    return;
  }
  const routes = routeConfiguration();
  history.push(
    createResourceLocatorString(
      "ListingPage",
      routes,
      { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
      {}
    )
  );
};

const categoryLabel = (categories, key) => {
  const cat = categories.find(c => c.key === key);
  return cat ? cat.label : key;
};

export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const { enquiryModalOpenForListingId, params } = props;
    this.state = {
      pageClassNames: [],
      imageCarouselOpen: false,
      enquiryModalOpen: enquiryModalOpenForListingId === params.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onContactUser = this.onContactUser.bind(this);
    this.onSubmitEnquiry = this.onSubmitEnquiry.bind(this);
  }

  handleSubmit(values) {
    const { history, getListing, params, useInitialValues } = this.props;
    const listingId = new UUID(params.id);
    const listing = getListing(listingId);

    const { bookingDates, bookingDate, seats, hours, ...bookingData } = values;
    const seatsNumber = parseInt(seats, 10);

    const dailyQuantity =
      bookingDates &&
      (moment(bookingDates.endDate).diff(bookingDates.startDate, "days") + 1) *
        (seatsNumber || 1);
    const hourlyQuantity = hours * seatsNumber;
    const quantity =
      listing.attributes.publicData.pricing_scheme === "daily_flat" ||
      listing.attributes.publicData.pricing_scheme === "daily_seats"
        ? dailyQuantity
        : hourlyQuantity;
    const initialValues = {
      listing,
      bookingData: {
        ...bookingData,
        seats: seatsNumber,
        quantity,
        hours: hours,
        pricing_scheme: listing.attributes.publicData.pricing_scheme
      },
      bookingDates: {
        bookingStart:
          (bookingDates && bookingDates.startDate) || bookingDate.date,
        bookingEnd:
          (bookingDates &&
            moment(bookingDates.endDate)
              .add(1, "day")
              .toDate()) ||
          moment(bookingDate.date)
            .add(1, "day")
            .toDate()
      }
    };

    const routes = routeConfiguration();
    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName("CheckoutPage", routes);
    useInitialValues(setInitialValues, initialValues);

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        "CheckoutPage",
        routes,
        { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
        {}
      )
    );
  }

  onContactUser() {
    const {
      currentUser,
      history,
      useInitialValues,
      params,
      location
    } = this.props;

    if (!currentUser) {
      const state = {
        from: `${location.pathname}${location.search}${location.hash}`
      };

      // We need to log in before showing the modal, but first we need to ensure
      // that modal does open when user is redirected back to this listingpage
      useInitialValues(setInitialValues, {
        enquiryModalOpenForListingId: params.id
      });

      // signup and return back to listingPage.
      history.push(
        createResourceLocatorString("SignupPage", routeConfiguration(), {}, {}),
        state
      );
    } else {
      this.setState({ enquiryModalOpen: true });
    }
  }

  onSubmitEnquiry(values) {
    const { history, params, onSendEnquiry } = this.props;
    const routes = routeConfiguration();
    const listingId = new UUID(params.id);
    const { message } = values;

    onSendEnquiry(listingId, message.trim())
      .then(txId => {
        this.setState({ enquiryModalOpen: false });

        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString(
            "OrderDetailsPage",
            routes,
            { id: txId.uuid },
            {}
          )
        );
      })
      .catch(() => {
        // Ignore, error handling in duck file
      });
  }

  render() {
    const {
      unitType,
      isAuthenticated,
      currentUser,
      getListing,
      getOwnListing,
      intl,
      onManageDisableScrolling,
      params: rawParams,
      location,
      scrollingDisabled,
      showListingError,
      history,
      reviews,
      fetchReviewsError,
      sendEnquiryInProgress,
      sendEnquiryError,
      timeSlots,
      fetchTimeSlotsError,
      categoriesConfig,
      goalsConfig
    } = this.props;

    const isBook = !!parse(location.search).book;
    const listingId = new UUID(rawParams.id);
    const isPendingApprovalVariant =
      rawParams.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT;
    const currentListing = isPendingApprovalVariant
      ? ensureOwnListing(getOwnListing(listingId))
      : ensureListing(getListing(listingId));

    const listingSlug =
      rawParams.slug || createSlug(currentListing.attributes.title || "");
    const params = { slug: listingSlug, ...rawParams };

    const isApproved =
      currentListing.id &&
      currentListing.attributes.state !== LISTING_STATE_PENDING_APPROVAL;

    const pendingIsApproved = isPendingApprovalVariant && isApproved;

    // If a /pending-approval URL is shared, the UI requires
    // authentication and attempts to fetch the listing from own
    // listings. This will fail with 403 Forbidden if the author is
    // another user. We use this information to try to fetch the
    // public listing.
    const pendingOtherUsersListing =
      isPendingApprovalVariant &&
      showListingError &&
      showListingError.status === 403;
    const shouldShowPublicListingPage =
      pendingIsApproved || pendingOtherUsersListing;

    if (shouldShowPublicListingPage) {
      return (
        <NamedRedirect
          name="ListingPage"
          params={params}
          search={location.search}
        />
      );
    }

    const {
      description = "",
      geolocation = null,
      price = null,
      title = "",
      publicData
    } = currentListing.attributes;

    const richTitle = (
      <span>
        {richText(title, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
          longWordClass: css.longWord
        })}
      </span>
    );

    const topbar = <TopbarContainer />;

    if (showListingError && showListingError.status === 404) {
      // 404 listing not found

      return <NotFoundPage />;
    } else if (showListingError) {
      // Other error in fetching listing

      const errorTitle = intl.formatMessage({
        id: "ListingPage.errorLoadingListingTitle"
      });

      return (
        <Page title={errorTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.errorText}>
                <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      const loadingTitle = intl.formatMessage({
        id: "ListingPage.loadingListingTitle"
      });

      return (
        <Page title={loadingTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.loadingText}>
                <FormattedMessage id="ListingPage.loadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    }

    const handleViewPhotosClick = e => {
      // Stop event from bubbling up to prevent image click handler
      // trying to open the carousel as well.
      e.stopPropagation();
      this.setState({
        imageCarouselOpen: true
      });
    };
    const authorAvailable = currentListing && currentListing.author;
    const pricingSchemeAvailable =
      currentListing && currentListing.attributes.publicData.pricing_scheme;
    const pricing_scheme_label = pricingSchemeAvailable
      ? config.custom.pricing_schemes.find(
          scheme => scheme.key === pricingSchemeAvailable
        ).label
      : null;
    const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
    const isOwnListing =
      userAndListingAuthorAvailable &&
      currentListing.author.id.uuid === currentUser.id.uuid;
    const isClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
    const showContactUser = !currentUser || (currentUser && !isOwnListing);
    const group_size =
      currentListing && currentListing.attributes.publicData.group_size;

    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);
    const included =
      currentListing && currentListing.attributes.publicData.included;
    const duration =
      currentListing && currentListing.attributes.publicData.duration;
    const availability =
      currentListing && currentListing.attributes.publicData.availability;

    const bannedUserDisplayName = intl.formatMessage({
      id: "ListingPage.bannedUserDisplayName"
    });
    const authorDisplayName = userDisplayName(
      ensuredAuthor,
      bannedUserDisplayName
    );
    const authorOrganisation =
      currentListing.author.attributes.profile.publicData.organisation;

    const { formattedPrice, priceTitle } = priceData(price, intl);

    const handleMobileBookModalClose = () => {
      closeBookModal(history, currentListing);
    };

    const handleBookingSubmit = values => {
      const isCurrentlyClosed =
        currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        this.handleSubmit(values);
      }
    };

    const handleBookButtonClick = () => {
      const isCurrentlyClosed =
        currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        openBookModal(history, currentListing);
      }
    };

    const listingImages = (listing, variantName) =>
      (listing.images || [])
        .map(image => {
          const variants = image.attributes.variants;
          const variant = variants ? variants[variantName] : null;

          // deprecated
          // for backwards combatility only
          const sizes = image.attributes.sizes;
          const size = sizes ? sizes.find(i => i.name === variantName) : null;

          return variant || size;
        })
        .filter(variant => variant != null);

    const facebookImages = listingImages(currentListing, "facebook");
    const twitterImages = listingImages(currentListing, "twitter");
    const schemaImages = JSON.stringify(facebookImages.map(img => img.url));
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage(
      { id: "ListingPage.schemaTitle" },
      { title, price: formattedPrice, siteTitle }
    );

    const hostLink = (
      <NamedLink
        className={css.authorNameLink}
        name="ListingPage"
        params={params}
        to={{ hash: "#host" }}
      >
        {authorOrganisation ? authorOrganisation : authorDisplayName}
      </NamedLink>
    );

    const category =
      publicData && publicData.category ? (
        <span>
          {categoryLabel(categoriesConfig, publicData.category)}
          <span className={css.separator}>•</span>
        </span>
      ) : null;

    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        author={authorDisplayName}
        contentType="website"
        description={description}
        facebookImages={facebookImages}
        twitterImages={twitterImages}
        schema={{
          "@context": "http://schema.org",
          "@type": "ItemPage",
          description: description,
          name: schemaTitle,
          image: schemaImages
        }}
      >
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div>
              <SectionImages
                title={title}
                listing={currentListing}
                isOwnListing={isOwnListing}
                editParams={{
                  id: listingId.uuid,
                  slug: listingSlug,
                  type: "edit",
                  tab: "description"
                }}
                imageCarouselOpen={this.state.imageCarouselOpen}
                onImageCarouselClose={() =>
                  this.setState({ imageCarouselOpen: false })
                }
                handleViewPhotosClick={handleViewPhotosClick}
                onManageDisableScrolling={onManageDisableScrolling}
              />
              <div className={css.contentContainer}>
                <SectionAvatar user={currentAuthor} params={params} />
                <div className={css.mainContent}>
                  <SectionHeading
                    priceTitle={priceTitle}
                    pricing_scheme={pricing_scheme_label}
                    formattedPrice={formattedPrice}
                    richTitle={richTitle}
                    category={category}
                    hostLink={hostLink}
                    showContactUser={showContactUser}
                    onContactUser={this.onContactUser}
                  />
                  <SectionDescription
                    description={description}
                    group_size={group_size}
                    included={included}
                    duration={duration}
                    availability={availability}
                  />
                  <SectionFeatures
                    options={goalsConfig}
                    selectedOptions={publicData.goals}
                  />
                  <SectionRulesMaybe publicData={publicData} />

                  <SectionMapMaybe
                    geolocation={geolocation}
                    publicData={publicData}
                    listingId={currentListing.id}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      className={css.button}
                      onClick={() => createPDF(title)}
                      label="Export"
                    >
                      Export PDF
                    </Button>
                  </div>
                  <SectionReviews
                    reviews={reviews}
                    fetchReviewsError={fetchReviewsError}
                  />
                  <SectionHost
                    title={title}
                    listing={currentListing}
                    authorDisplayName={authorDisplayName}
                    onContactUser={this.onContactUser}
                    isEnquiryModalOpen={
                      isAuthenticated && this.state.enquiryModalOpen
                    }
                    onCloseEnquiryModal={() =>
                      this.setState({ enquiryModalOpen: false })
                    }
                    sendEnquiryError={sendEnquiryError}
                    sendEnquiryInProgress={sendEnquiryInProgress}
                    onSubmitEnquiry={this.onSubmitEnquiry}
                    currentUser={currentUser}
                    onManageDisableScrolling={onManageDisableScrolling}
                  />
                </div>

                {currentUser &&
                  !currentUser.attributes.profile.publicData.provider && (
                    <SectionBooking
                      listing={currentListing}
                      isOwnListing={isOwnListing}
                      isClosed={isClosed}
                      isBook={isBook}
                      unitType={unitType}
                      price={price}
                      formattedPrice={formattedPrice}
                      priceTitle={priceTitle}
                      handleBookingSubmit={handleBookingSubmit}
                      richTitle={richTitle}
                      authorDisplayName={authorDisplayName}
                      handleBookButtonClick={handleBookButtonClick}
                      handleMobileBookModalClose={handleMobileBookModalClose}
                      onManageDisableScrolling={onManageDisableScrolling}
                      timeSlots={timeSlots}
                      fetchTimeSlotsError={fetchTimeSlotsError}
                    />
                  )}
              </div>
            </div>
            <div style={{ height: "0px", overflow: "hidden" }}>
              <div
                id="pdf"
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: "#fcfcfc"
                }}
              >
                <div>
                  <div className={css.threeToTwoWrapper} />
                  <div className={css.pdfContainer}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Logo />
                    </div>
                    <SectionAvatar user={currentAuthor} params={params} />
                    <div className={css.mainContent}>
                      <SectionHeading
                        priceTitle={priceTitle}
                        pricing_scheme={pricing_scheme_label}
                        formattedPrice={<div>{formattedPrice}</div>}
                        richTitle={
                          <span>
                            {richText(title, {
                              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
                              longWordClass: css.longWord
                            })}
                          </span>
                        }
                        category={category}
                        hostLink={hostLink}
                        showContactUser={false}
                        onContactUser={this.onContactUser}
                      />
                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          fontSize: "14px",
                          marginBottom: "20px"
                        }}
                      >
                        {description}
                      </div>

                      <SectionRulesMaybe publicData={publicData} />
                      <SectionMapMaybe
                        geolocation={geolocation}
                        publicData={publicData}
                        listingId={currentListing.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ListingPageComponent.defaultProps = {
  unitType: config.bookingUnitType,
  currentUser: null,
  enquiryModalOpenForListingId: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  sendEnquiryError: null,
  categoriesConfig: config.custom.categories,
  goalsConfig: config.custom.goals
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired
  }).isRequired,
  location: shape({
    search: string
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
    variant: oneOf([LISTING_PAGE_PENDING_APPROVAL_VARIANT])
  }).isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  getOwnListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  enquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  useInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  fetchReviewsError: propTypes.error,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  sendEnquiryInProgress: bool.isRequired,
  sendEnquiryError: propTypes.error,
  onSendEnquiry: func.isRequired,

  categoriesConfig: array,
  goalsConfig: array
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    enquiryModalOpenForListingId
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const ref = { id, type: "listing" };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: "ownListing" };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    scrollingDisabled: isScrollingDisabled(state),
    enquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    sendEnquiryInProgress,
    sendEnquiryError
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  useInitialValues: (setInitialValues, values) =>
    dispatch(setInitialValues(values)),
  onSendEnquiry: (listingId, message) =>
    dispatch(sendEnquiry(listingId, message))
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ListingPageComponent);

ListingPage.setInitialValues = initialValues => setInitialValues(initialValues);
ListingPage.loadData = loadData;

export default ListingPage;
