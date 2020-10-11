import { observer } from "mobx-react";
import { SearchBar } from "../ui/base/search_bar/SearchBar";
import { SearchStore, SearchPresenter } from "./SearchPresenter";
import { SearchResultsList } from "./search_results_list/SearchResultsList";
import * as React from "react";
import { SearchPage } from "./SearchPage";

export const createSearchPage = () => {
  const store = new SearchStore();
  const presenter = new SearchPresenter();

  const onSubmit = () => {
    presenter.search(store);
  };
  const SearchBarWrapper = observer(() => (
    <SearchBar store={store} onSubmit={onSubmit} />
  ));

  const SearchResult = observer(() => <SearchResultsList store={store} />);
  // eslint-disable-next-line react/display-name
  return () => (
    <SearchPage SearchResults={SearchResult} SearchBar={SearchBarWrapper} />
  );
};
