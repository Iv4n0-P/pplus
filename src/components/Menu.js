import React from 'react'
import planplus from '../apis/planplus'
import { CarouselProvider, Slider, Slide, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from 'react-router-dom'

const Menu = (props) => {

    const [categories, setCategories] = React.useState([])
    

    React.useEffect(() => {
        const getCategories = async () => {
            const { data } = await planplus.get(`${props.match.params.lang}/categories/menu`)
            setCategories(data.results)

        }
        getCategories()

    }, [])

    const renderCategories = () => {
        return categories.map((cat, i) => {
            return (
                <Slide key={i} index={i}>
                    <div className="menu-card" key={cat.id} onClick={() => { handleOnClick(cat.id, cat.name) }} style={{ backgroundImage: `url(${cat.image})` }}>
                        <h3 className="menu-card-title">{cat.name}</h3>
                    </div>
                </Slide>
            )
        })
    }

    const renderDots = () => {
        return categories.map((cat, i) => {
            return <Dot slide={i} className="dots">{cat.name}</Dot>
        })
    }

    const handleOnClick = (menuId, catName) => {
        props.history.push(`/meals?category=${catName}&id=${menuId}&lang=${props.match.params.lang}`)
    }

    const getButtonBackTitle = () => {
        if (props.match.params.lang === 'hr') {
            return 'Povratak na odabir jezika'
        }

        if (props.match.params.lang === 'en') {
            return 'Go back to language selection'
        }

        if (props.match.params.lang === 'it') {
            return 'Torna alla selezione della lingua'
        }

        if (props.match.params.lang === 'de') {
            return 'Kehren Sie zur Sprachauswahl zurück'
        }
    }

    return (
        <div className="menu-container">
            <div className="meal-header">
                <div className="column-1-meal">
                    <Link className="button-back" to="/">{getButtonBackTitle()}</Link>
                    </div>
                <div className="column-3-meal">
                    <h6 className="bell-title">Call staff</h6>
                    <span className="bell fa fa-bell"></span>
                </div>
            </div>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={130}
                totalSlides={categories.length}
                visibleSlides={1}
                isPlaying={true}
                interval={3000}
                orientation={'vertical'}
                className={'menu-carousel-wrapper'}
                dragEnabled={false}
                infinite={true}
            >
                <div className="slider-wrapper">
                    <Slider
                        moveThreshold={0.01}
                    >
                        {renderCategories()}
                    </Slider>
                </div>
                <div className="dots-wrapper">
                    {renderDots()}
                </div>
            </CarouselProvider>

        </div>
    )
}



export default Menu