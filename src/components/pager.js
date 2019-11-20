import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputBase';
import Select from "@material-ui/core/Select";

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    ipp: [10, 20, 30, 40, 50],
    pageSize: 50
}

class Pagify extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pager: {},
            requestedIPP: 0,
        };
        this.handleIPPChange = this.handleIPPChange.bind(this);
    }

    componentWillMount() {
        if (this.props.items && this.props.items.length)
            this.setPage(this.props.initialPage);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items)
            this.setPage(this.props.initialPage);
    }

    setPage(page) {
        var { items, ipp } = this.props;
        var pageSize = ipp[this.state.requestedIPP]
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages)
            return;
        pager = this.getPager(items.length, page, pageSize);
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({ pager: pager });
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }


    handleIPPChange(event) {
        this.setState({ requestedIPP: event.target.value}, () => this.setPage(this.props.initialPage))
    }


    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1)
            return null;

        return (
            <div>
                <FormControl>
                    <InputLabel id="ipp-select-label">Items per page</InputLabel>
                    <Select
                        labelId="ipp-select"
                        id="ipp-select"
                        value={this.state.requestedIPP}
                        onChange={this.handleIPPChange}
                    >
                        {this.props.ipp.map((item, i) => { return <MenuItem value={i}>{item}</MenuItem> })} 
                    </Select>
                </FormControl>
                <ul className="pagination">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage - 1)}>Prev</a>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </div>
        );
    }
}

Pagify.propTypes = propTypes;
Pagify.defaultProps = defaultProps;
export default Pagify;