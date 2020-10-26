import React, { Component } from "react";
import Style from "./new.module.scss";

export default class Leagues extends Component {
    render() {
        return (
            <div className={Style.card}>
                <img src="https://res.cloudinary.com/jasonheecs/image/upload/v1479748268/card-hover/photo-3.jpg" />
                <div className={Style.card__desc}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cumque, possimus dicta ipsam est mollitia.
                </div>
            </div>
        );
    }
}
