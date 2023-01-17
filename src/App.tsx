import React, { useState } from 'react';
import './App.scss';

import cn from 'classnames';
import usersFromServer from './api/users';
import { products } from './api/data';
import { Table } from './components/Table';

export const App: React.FC = () => {
  const [productsList, setProductsList] = useState(products);
  const [activeFilter, setActiveFilter] = useState(0);

  const clearUserFilter = () => setProductsList(products);

  const filterByUserId = (id: number) => {
    const filter = [...products].filter((p) => p.category?.ownerId === id);

    setActiveFilter(id);
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
                onClick={clearUserFilter}
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({ 'is-active': activeFilter === 0 })}
              >
                All
              </a>

              {usersFromServer.map((user) => (
                <a
                  key={user.id}
                  onClick={() => filterByUserId(user.id)}
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': activeFilter === user.id })}
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
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
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
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <Table products={productsList} />
        </div>
      </div>
    </div>
  );
};
