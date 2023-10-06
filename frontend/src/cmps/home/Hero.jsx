import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { Sky } from './Sky'
import { TemplateList } from './TemplateList'


export const Hero = () => {

    return (
        <div className='hero-wrapper main-layout full'>
            <section className="hero">
                <Sky />
                <h1 className='main-title' >A platform built for a new way of budgeting</h1>
                <h2>it so nice to
                    <span className='bold-me'>
                        <span className='underline'></span> budget
                    </span> with homefin.com
                </h2>

                {/* <TemplateList /> */}

                <Link to="account">
                    <button className='see-demo-btn flex'>
                        <span>Get started</span>
                        <Icon name='full-arrow' />
                    </button>
                </Link>
            </section>
        </div>
    )
}