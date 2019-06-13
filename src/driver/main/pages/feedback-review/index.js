import FeedbackReview from './feedback-review.component';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { USER_STORE, PROFILE } from 'constants/store';

const getUserProfile = state => state[USER_STORE][PROFILE];

const homeSelector = createSelector(
  getUserProfile,
  (user) => ({ user })
);

export default connect(homeSelector)(withNavigation(FeedbackReview));


