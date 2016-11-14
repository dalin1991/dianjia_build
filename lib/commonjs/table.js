/**
 * Created by BG236557 on 2016/10/25.
 */
const React = require('react');
const ElTable = require('el-table');
const ETable = ElTable.Table;
const Col = ElTable.Col;

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    onPageChange(page, sizePerPage) {
        this.props.onPageChange(page, (page - 1) * sizePerPage, {});
    }

    onSortChange(orderField, sortType) {
        const {page} = this.props;
        const orderType = sortType && sortType.toUpperCase() || '';
        this.props.onSortChange(page, (page - 1) * 10, {orderField, orderType})
    }

    render() {
        const {data, isKey, orderField, pagination, page, orderType, dataSize, children, selected, selectMode, onSelect, onSelectAll} = this.props;
        const options = {
            page: page,
            sizePerPage: 10,
            paginationSize: 6,
            sizePageList: [10],
            onPageChange: this.onPageChange.bind(this)
        };
        const selectRow = {
            mode: selectMode,
            clickToSelect: true,
            selected: selected,
            onSelect: onSelect,
            onSelectAll: onSelectAll,
            bgColor: "#ffd800"
        };
        return (
            <ETable
                data={data}
                isKey={isKey}
                remote={true}
                pagination={pagination}
                options={options}
                dataSize={dataSize}
                topPagination={pagination}
                sortName={orderField}
                selectRow={selectMode && selectRow}
                onSortChange={this.onSortChange.bind(this)}
                sortOrder={orderType && orderType.toLowerCase() || undefined}
            >
                {children}
            </ETable>
        )
    }
}

Table.defaultProps = {
    page: 1,
    pagination: true,
    onPageChange: ()=> {
    }
};

module.exports = {Table, Col};