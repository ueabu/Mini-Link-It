import React, { Component } from "react";

export default class Form extends Component {
    render() {
        return (
            <form >
                <h3>Mini Link It!</h3>

                <div className="form-group">
                    <label>Enter Your Long URL</label>
                    <input type="email" className="form-control" placeholder="Enter long URL" />
                </div>

                <div className="form-group">

                    <label htmlFor="basic-url">Your Mini URL</label>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">minilinkit.com/</span>
                        </div>
                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Mini Link It</button>
            </form>
        );
    }
}