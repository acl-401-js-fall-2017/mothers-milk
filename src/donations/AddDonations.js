import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDonation } from './actions';

class AddDonations extends Component {

  constructor(){
    super();
    this.state = {
      showMessage: false,
      // dropSite: '5a33ee322d693f852640e2ee', for dev 
      dropSite: '5a34258e7bf84a00216aad89',
      isChecked: false,
      fedExName: ''
    };
  }

  handleChange = (event) => {
    const fedExName = event.target.checked ? 'FedEx' : '';
    this.setState({
      isChecked: true,
      fedExName: fedExName
    });
  }

  handleDonate = event => {
    event.preventDefault();
    let { dropSite, quantity, lastDonation } = event.target.elements;
    const { user } = this.props;
    // only use conditionality around what varies
    dropSite = this.state.isChecked ? this.state.dropSite : dropSite.value;

    this.props.addDonation(
      { 
        quantity: quantity.value,
        dropSite,
        lastDonation: lastDonation.value,
        donor: user._id,
        status: 'Awaiting Pickup',
        quantityReceived: 0
      });
    this.setState({ showMessage: true });
    window.setTimeout(() => {
      this.setState({ showMessage: false });
    }, 4000);
  }

  render() {
    const message = 'Thank you for donating!';
    const { dropSites } = this.props;
   
    // added a default to mapStateToProps, so this can be simplified.
    
    return (
      
      <div className="tile is-parent hero is-light">        
        {(this.state.showMessage) ? <p>{message}</p> : 
          (<div>
            <form onSubmit={event => this.handleDonate(event)}>
              <p className="subtitle is-6">Ship milk by FedEx   &nbsp;<input type="checkbox" value="FedEx" onChange={this.handleChange}/>
              </p>
              {(this.state.fedExName !== 'FedEx') && (
                <div>
                  <p className="subtitle is-6">-- OR --</p>
                  <p className="subtitle is-6">Drop at nearest milk drop location
                  </p>
                  <div className="subtitle is-6 label">Select a drop site location</div>                  
                  <DropSites dropSites={dropSites}/>
                </div>
              )}
              <br/><br/>
              <div className="subtitle is-6 label">Quantity(in ounces):</div>
              <input className="button is-outlined" name="quantity" placeholder="quantity"/>
              <br/><br/>
              <div className="subtitle is-6 label">Is this your last donation?&nbsp;<input name="lastDonation" type="checkbox"/></div>
              <br/><br/>
              <button className="button is-primary" type="submit">Submit</button>
              <br/><br/>
            </form>             
          </div>
          )
        }
      </div>
    );
  }
}

// Make this a "whole" component
const DropSites = ({ dropSites }) => (
  <div className="select">
    <select name="dropSite" className="button is-outlined is-size-6">
      {dropSites.map(dropSite => (
        <option key={dropSite._id} value={dropSite._id}>{dropSite.name}</option>
      ))}
    </select>    
  </div>
);

export default connect(
  // add default...
  ({ donations, dropSites = [] }) => ({ donations, dropSites }),
  { addDonation }
)(AddDonations);