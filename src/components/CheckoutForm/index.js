import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

import "./index.css"

const states =
{
    US: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    CA: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'],
    AU: ['Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'],
    GB: ['England', 'Northern Ireland', 'Scotland', 'Wales'],
    IN: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
}


class CheckoutForm extends Component {
    state = { country: '', state: '', fullName: '', email: '', phone: '', city: '', address: '', zip: '', deliveryMode: '' }

    handleCountryChange = (event) => {
        this.setState({ country: event.target.value })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    onSubmitForm = (event) => {
        event.preventDefault()

        const {
            fullName,
            email,
            phone,
            address,
            city,
            country,
            state,
            zip,
            deliveryMode
        } = this.state;

        if (
            fullName &&
            email &&
            phone &&
            address &&
            city &&
            country &&
            state &&
            zip &&
            deliveryMode
        ) {
            this.props.history.push('/orderSuccess')
        } else {
            alert('Please fill out all the fields before proceeding.');
        }
    };


    render() {
        const { country, state, fullName, email, phone, address, city, zip, deliveryMode } = this.state

        return (

            <div className="checkoutForm-container">
                <h1 className="checkoutHeading">Checkout</h1>
                <form className="checkout-form" onSubmit={this.onSubmitForm}>
                    <div className="section">
                        <h2 className="contactDetails-heading">Contact Details</h2>
                        <label className="label" htmlFor="fullName">Full Name</label>
                        <input className="formInput" type="text" id="fullName" name="fullName" placeholder="Your Name" value={fullName} onChange={this.handleChange} required />

                        <label className="label" htmlFor="email">Email</label>
                        <input className="formInput" type="email" id="email" name="email" placeholder="example@mail.com" value={email} onChange={this.handleChange} required />

                        <label className="label" htmlFor="phone">Phone Number</label>
                        <input className="formInput" type="tel" id="phone" name="phone" placeholder="+123 456 7890" value={phone} onChange={this.handleChange} required />
                    </div>

                    <div className="section">
                        <h2>Delivery Address</h2>
                        <label className="label" htmlFor="address">Street Address</label>
                        <input className="formInput" type="text" id="address" name="address" placeholder="123 Main St" value={address} onChange={this.handleChange} required />

                        <label className="label" htmlFor="city">City</label>
                        <input className="formInput" type="text" id="city" name="city" placeholder="City Name" value={city} onChange={this.handleChange} required />

                        <label className="label" htmlFor="country">Country</label>
                        <select
                            className="select"
                            id="country"
                            name="country"
                            value={country}
                            onChange={this.handleCountryChange}
                            required
                        >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                            <option value="GB">United Kingdom</option>
                            <option value="IN">India</option>
                        </select>

                        <label className="label" htmlFor="state">State/Province</label>
                        <select
                            className="select"
                            id="state"
                            name="state"
                            value={state}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Select State/Province</option>
                            {states[country]?.map((stateName, index) => (
                                <option key={index} value={stateName}>{stateName}</option>
                            ))}
                        </select>
                        <label className="label" htmlFor="zip">Postal/Zip Code</label>
                        <input className="formInput" type="text" id="zip" name="zip" placeholder="12345" value={zip} onChange={this.handleChange} required />
                    </div>

                    <div className="section">
                        <h2>Delivery Mode</h2>
                        <label className="label" htmlFor="deliveryMode">Choose Delivery Mode:</label>
                        <select className="select" id="deliveryMode" name="deliveryMode" value={deliveryMode} onChange={this.handleChange} required>
                            <option value="standard">Standard Shipping (5-7 days)</option>
                            <option value="express">Express Shipping (2-3 days)</option>
                            <option value="overnight">Overnight Shipping (1 day)</option>
                        </select>
                    </div>
                    <button type="submit" className="checkout-btn">Place Order</button>
                </form>
            </div>
        )
    }
}



export default withRouter(CheckoutForm)

