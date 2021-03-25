import React from 'react'
import planplus from '../apis/planplus'
import * as QueryString from 'query-string'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Meal = (props) => {

    const [meal, setMeal] = React.useState({})
    const params = QueryString.parse(props.location.search)

    React.useEffect(() => {
        const getMeal = async () => {
            const { data } = await planplus.get(`${params.lang}/items/menu-item/${params.id}`)
            setMeal(data)
        }
        getMeal()
    }, [params])

    const renderRelated = () => {
        if (meal.related_items) {

            return meal.related_items.map((item, i) => {
                return (<Slide key={i} index={i}>

                    <div onClick={() => { props.history.push(`/meal?id=${item.id}&lang=${params.lang}`) }} className="related-meal">
                        <div className="related-meal-overflow">
                            <div className="related-meal-photo" style={{ backgroundImage: `url(${item.image})` }}></div>
                        </div>
                        <div className="related-meal-content">
                            <h6 className="related-meal-title">{item.name}</h6>
                            <div className="related-meal-price-wrap">
                                <div className="related-meal-price-wrap-line-wrap">
                                    <div className="line"></div>
                                </div>
                                <div className="related-meal-price-price-wrap">
                                    <p className="related-meal-price">{item.price} <span>kn</span></p>
                                </div>
                            </div>

                        </div>
                    </div>


                </Slide>)
            })


        }
    }

    const getRelatedItemsTitle = () => {
        if (params.lang === 'hr') {
            return 'Sa ovim preporučujemo'
        }

        if (params.lang === 'en') {
            return 'With this we recommend'
        }

        if (params.lang === 'it') {
            return 'Con questo offriamo'
        }

        if (params.lang === 'de') {
            return 'Damit bieten wir'
        }
    }

    const getButtonBackTitle = () => {
        if (params.lang === 'hr') {
            return 'Povratak'
        }

        if (params.lang === 'en') {
            return 'Go back'
        }

        if (params.lang === 'it') {
            return 'Torna indietro'
        }

        if (params.lang === 'de') {
            return 'Geh zurück'
        }
    }

    return (
        <div className="meal-container">
            <div className="meal-header">
                <div className="column-1-meal">
                    <p className="button-back-meal" onClick={() => { props.history.goBack() }}>{getButtonBackTitle()}</p>
                </div>
                <div className="column-3-meal">
                    <h6 className="bell-title">Call staff</h6>
                    <span className="bell fa fa-bell"></span>
                </div>
            </div>
            <div className="meal-wrap">
                <div className="meal-photo">
                    <div className="meal-photo-img" style={{ backgroundImage: `url(${meal.image})` }}>
                        <div className="meal-price2">
                            <p><span>{meal.price}</span> kn</p>
                        </div>


                    </div>
                </div>
                <div className="meal-content-single">
                    <h1 className="meal-title">{meal.name}</h1>
                    <p className="meal-desc">{meal.description}</p>
                    <div className="related-meals">

                        <CarouselProvider
                            naturalSlideWidth={10}
                            naturalSlideHeight={10}
                            totalSlides={meal.related_items && meal.related_items.length}
                            visibleSlides={1}
                            isPlaying={true}
                            interval={3000}
                            step={1}
                            infinite={true}
                        >
                            <div className="meal-slider-wrap">




                                <div className="meal-slider-wraper">
                                    <div className="meal-slider-header">
                                        <h5 className="meal-controls-title">{getRelatedItemsTitle()}</h5>
                                        <div className="meal-buttons">
                                            <ButtonBack className="meal-bback">&larr;</ButtonBack>
                                            <ButtonNext className="meal-bback">&rarr;</ButtonNext>
                                        </div>
                                    </div>

                                    <Slider
                                        className="meal-slider"
                                        moveThreshold={0.01}
                                    >
                                        {renderRelated()}
                                    </Slider>
                                </div>

                            </div>
                        </CarouselProvider>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Meal