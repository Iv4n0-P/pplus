import React from 'react'
import planplus from '../apis/planplus'
import { CarouselProvider, Slider, Slide, DotGroup, Dot, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import './css/menu.css'

const Menu = (props) => {

    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        const getCategories = async () => {
            const { data } = await planplus.get('/categories/menu', {
                params: {
                    origin: '*'
                }
            })
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
        props.history.push(`/menu?category=${catName}&id=${menuId}`)
    }

    return (
        <div className="menu-container">
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