import React, { useState } from 'react';
import './App.scss';

import cn from 'classnames';
import usersFromServer from './api/users';
import { products } from './api/data';
import { Table } from './components/Table';

export const App: React.FC = () => {
  const [productsList, setProductsList] = useState(products);
  const [filterByUser, setFilterByUser] = useState(0);
  const [filterByName, setFilterByName] = useState('');

  const filterList = (userId: number, name: string) => {
    let filter = products;

    if (userId !== 0) {
      filter = products.filter((p) => p.category?.ownerId === userId);
    }

    if (name !== '') {
      filter = filter.filter((p) => p.name.toLocaleLowerCase()
        .includes(name.trim().toLocaleLowerCase()));
    }

    setFilterByUser(userId);
    setProductsList(filter);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => filterList(0, filterByName)}
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({ 'is-active': filterByUser === 0 })}
              >
                All
              </a>

              {usersFromServer.map((user) => (
                <a
                  key={user.id}
                  onClick={() => filterList(user.id, filterByName)}
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': filterByUser === user.id })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={filterByName}
                  onChange={(event) => {
                    const { value } = event.target;

                    setFilterByName(value);
                    filterList(filterByUser, value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {filterByName !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => {
                        setFilterByName('');
                        filterList(filterByUser, '');
                      }}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setFilterByName('');
                  setFilterByUser(0);
                  filterList(0, '');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {productsList.length > 0 ? (
            <Table products={productsList} />
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
