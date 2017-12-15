import React, { Component } from 'react';
import DonorInfo from './DonorInfo';
import Donations from '../donations/Donations';
import SupplyRequest from '../supplyRequest/SupplyRequest';
import { loadDropSites } from '../dropSites/actions';
import { loadDonations } from '../donations/actions';
import { connect } from 'react-redux';
import '../style/mystyle.css';


class DonorView extends Component {
  componentDidMount() {
    this.props.loadDropSites();
  }

  render() {

    const { user, donations } = this.props;

    //user && this.props.loadDonations();

    return (
      <div className="column is-8 is-offset-2">
        <div className="tile is-parent">
          <div className="tile is-child box hero is-warning">
            <br/><br/>
            <h1 className="title">Welcome { user ? user.name : '' }</h1>
            <h2 className="subtitle">Thank you for participating in the milk drop program.</h2>
          </div>
        </div>
        <div className="container is-fluid">
          <div>
            <Donations/>
            <SupplyRequest/>
            <DonorInfo/>
          </div>
        </div>
      </div>
    );
  }
}



export default connect(
  ({ auth, donations }) => ({ user: auth.user, donations }),
  { loadDropSites, loadDonations }
)(DonorView);