import {Link} from "react-router-dom"


const Footer = (pageNa) => {
    return (
        <footer>
            <Link to="/">Main | </Link>
            <Link to= "/about">About</Link>
        </footer>
    )
}

export default Footer
