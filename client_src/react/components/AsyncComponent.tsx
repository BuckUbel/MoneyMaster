import * as React from "react";

// export interface IAsyncComponentProps {}

export interface IAsyncComponentState {
  isMounted: boolean;
}

export default abstract class AsyncComponent<P extends {}, S extends IAsyncComponentState>
  extends React.Component<P, S> {

  private constructor(props: P) {
    super(props);
    this.state = {isMounted: false} as Readonly<S>;
  }

  public componentDidMount() {
    this.setState({isMounted: true});
  }

  public componentWillUnmount() {
    this.setState({isMounted: false});
  }

}
