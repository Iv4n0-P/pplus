import React from 'react'
import planplus from '../apis/planplus'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import * as QueryString from 'query-string'
import { Link } from 'react-router-dom'

const Meals = (props) => {
    const [meals, setMeals] = React.useState([])
    const params = QueryString.parse(props.location.search)

    React.useEffect(() => {
        const getMeals = async () => {
            const { data } = await planplus.get(`${params.lang}/items/menu?category=${params.id}`)
            
            setMeals(data.results)
        }

        getMeals()
    }, [params.id])

    const getMeal = (id) => {
        props.history.push(`/meal?id=${id}&lang=${params.lang}`)
    }

    const renderMeals = () => {
        return (meals.map((meal, i) => {
            return (<Slide key={i} index={i}>
                <div onClick={() => {getMeal(meal.id)}} className="meal-card">
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

    const backToMenuLabel = () => {
        if (params.lang === 'hr') {
            return 'Povratak u meni'
        }

        if (params.lang === 'en') {
            return 'Back to menu'
        }

        if (params.lang === 'it') {
            return 'Torna al menu'
        }

        if (params.lang === 'de') {
            return 'Zurück zum Menü'
        }
    }

    const subtitleLabel = () => {
        if (params.lang === 'hr') {
            return 'Nakon što odlučite pozovite osoblje pritiskom na zvono'
        }

        if (params.lang === 'en') {
            return 'Once you decide, call the staff by pressing the bell'
        }

        if (params.lang === 'it') {
            return 'Una volta deciso, chiama lo staff premendo il campanello'
        }

        if (params.lang === 'de') {
            return 'Wenn Sie sich entschieden haben, rufen Sie das Personal an, indem Sie auf die Klingel drücken'
        }
    }


    return (
        <div className="meals-container">
            <div className="meals-header">
                <div className="column-1">
                    <Link className="button-back" to={`/menu/${params.lang}`}>{backToMenuLabel()}</Link>
                </div>
                <div className="column-2">
                    <h1 className="meals-title">{params.category}</h1>
                    <h3 className="meals-subtitle">{subtitleLabel()}</h3>
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
                    <Slider className="meals-slider"
                        moveThreshold={0.01}
                    >
                        {renderMeals()}
                    </Slider>
                    <ButtonBack className="meals-bback">&larr;</ButtonBack>
                    <ButtonNext className="meals-bnext">&rarr;</ButtonNext>
                </CarouselProvider>
            </div>
        </div>
    )
}

export default Meals