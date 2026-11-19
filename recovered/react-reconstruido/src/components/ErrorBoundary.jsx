import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl text-center bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              Ha ocurrido un error en la aplicación
            </h2>
            <pre className="text-sm text-left overflow-auto max-h-48 bg-gray-50 p-2 rounded">
              {String(
                this.state.error &&
                  (this.state.error.stack || this.state.error.message),
              )}
            </pre>
            <p className="mt-4 text-sm text-gray-600">
              Revisa la consola para más detalles.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
