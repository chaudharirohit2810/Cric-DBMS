import React, { useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Container,
    Row,
    Col,
} from "reactstrap";
import AddMatch from "./AddMatch";
import Style from "./match.module.scss";

const items = [
    {
        match_no: 40,
        date: "23 October 2020",
        league: "IPL",
        Team1: "Mumbai Indians",
        Team2: "Chennai Super Kings",
        Won_by: "Mumbai Indians",
    },
    {
        match_no: 41,
        date: "24 October 2020",
        league: "IPL",
        Team1: "Kings XI Punjab",
        Team2: "Sunrisers Hyderabad",
        Won_by: "Kings XI Punjab",
    },
    {
        match_no: 22,
        date: "24 October 2020",
        league: "Big Bash",
        Team1: "Sydney Sixers",
        Team2: "Melbourne Stars",
        Won_by: "Sydney Sixers",
    },
];

const Match = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <Container>
                    <div className={Style.match}>
                        <Row>
                            <Col xs="1"></Col>
                            <Col>
                                Match {item.match_no}: {item.league}
                            </Col>
                            <Col xs="1"></Col>
                        </Row>
                        <Row>
                            <Col xs="1"></Col>
                            <Col xs="10">
                                {item.Team1} vs {item.Team2}
                            </Col>
                            <Col xs="1"></Col>
                        </Row>
                        <Row>
                            <Col xs="1"></Col>
                            <Col>{item.Won_by} won the match</Col>
                            <Col xs="1"></Col>
                        </Row>
                    </div>
                </Container>
            </CarouselItem>
        );
    });

    return (
        <div style={{ marginBottom: "10px" }}>
            <Row>
                <Col>
                    <div className="titles">Recent Matches</div>
                </Col>
                <Col>
                    <AddMatch />
                </Col>
            </Row>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>
        </div>
    );
};

export default Match;
