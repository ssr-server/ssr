import React, { PropTypes as pt } from 'react';
import querystring from 'querystring';
import Helmet from 'react-helmet';
import { pure } from 'meteor/ssrwpo:ssr';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Folk from './routes/Folk';

const Aside = ({ folks }) => (
  <aside><ul>
    {folks.map(folk => <li key={folk.id}>
      <Link to={`/folks?folkId=${folk.id}`}>{folk.name}</Link>
    </li>)}
  </ul></aside>
);
Aside.propTypes = {
  folks: pt.array.isRequired,
};

const Folks = ({ folks, match, location }) => {
  const query = location && location.search
    ? querystring.parse(location.search.slice(1))
    : null;
  const folk = query && query.folkId
    ? folks.find(item => item.id === query.folkId)
    : null;
  return (
    <div>
      <Helmet title="Folks" />
      <h2>Folks</h2>
      <Route
        exact path={match.url} render={() => (
          folk
          ? <Folk name={folk.name} />
          : <Aside folks={folks} />
        )}
      />
    </div>
  );
};
Folks.propTypes = {
  folks: pt.array.isRequired,
  match: pt.object.isRequired,
  location: pt.object.isRequired,
};
export default connect(state => ({ folks: state.Folks }))(pure(Folks));
