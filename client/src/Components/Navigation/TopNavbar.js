import React from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function TopNavbar(props) {
    return (
        <div className="top-navbar">
            <div>

            </div>
            <div>
                <FontAwesomeIcon icon={faUserCircle} size="lg"  />
            </div>
        </div>
    )
}

TopNavbar.propTypes = {

}

export default TopNavbar

