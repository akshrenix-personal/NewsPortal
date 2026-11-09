import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error(error); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="text-center py-5">
        <h3>Something went wrong</h3>
        <p>Please refresh the page or try again later.</p>
        <button className="btn btn-dark" onClick={() => window.location.assign('/')}>Go to Home</button>
      </div>
    );
  }
}
