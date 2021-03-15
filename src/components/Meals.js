import React from 'react'
import planplus from '../apis/planplus'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './css/meals.css'
import * as QueryString from 'query-string'
import { Link } from 'react-router-dom'

const Meals = (props) => {
    const [meals, setMeals] = React.useState([])
    const params = QueryString.parse(props.location.search)

    React.useEffect(() => {
        const getMeals = async () => {
            const { data } = await planplus.get(`/items/menu?category=${params.id}`)

            setMeals(data.results)
        }

        getMeals()
    }, [])

    const renderMeals = () => {
        return (meals.map((meal, i) => {
            return (<Slide key={i} index={i}>
                <div className="meal-card">
                    <div className="meal-img-wrapper">
                        <img alt={meal.name} className="meal-img" src={meal.image} />
                        <div className="meal-price">
                            <p><span>{meal.price}</span> kn</p>
                        </div>
                    </div>
                    <div className="meal-content">
                        <h5 className="meal-name">{meal.name}</h5>
                    </div>
                </div>
            </Slide>
            )
        }))
    }

    return (
        <div className="meals-container">
            <div className="meals-header">
                <div className="column-1">
                    <Link className="button-back" to="/">Back to menu</Link>
                </div>
                <div className="column-2">
                    <h1 className="meals-title">{params.category}</h1>
                    <h3 className="meals-subtitle">Nakon što odlučite pozovite osoblje pritiskom na zvono</h3>
                </div>
                <div className="column-3">

                </div>
            </div>
            <div className="carousel-wrapper">
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={130}
                    totalSlides={meals.length}
                    visibleSlides={3}
                    isPlaying={true}
                    interval={3000}
                    step={3}
                    infinite={true}
                >
                    <Slider
                        moveThreshold={0.01}
                    >
                        {renderMeals()}
                    </Slider>
                    <ButtonBack>&larr;</ButtonBack>
                    <ButtonNext>&rarr;</ButtonNext>
                </CarouselProvider>
            </div>
        </div>
    )
}

export default Meals