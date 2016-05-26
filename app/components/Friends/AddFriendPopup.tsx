import * as React from 'react';
import { Popup } from '../Elements/Popup';
import { Button } from '../Elements/Button';
import { TextInput } from '../Form/TextInput';
import { ValidationPatterns } from '../../constants';
import { Spinner } from '../Elements/Spinner';

export interface IAddFriendPopupProps extends __React.Props<IAddFriendPopupProps> {
    showLoading?: boolean,
    onCancel?: Function,
    visible?: boolean
    onAdd?: Function
}

export class AddFriendPopup extends React.Component<IAddFriendPopupProps, any> implements React.ComponentLifecycle<IAddFriendPopupProps, any> {

    ctrls: {
        username: TextInput;
        button: Button;
    } = {} as any;

    state: any = {
        btnDisabled: true
    };

    static defaultProps: IAddFriendPopupProps = {
        showLoading: false,
        visible: false
    };

    constructor(props:IAddFriendPopupProps) {
        super(props);
    }

    handleAddFriend() {
        if (this.isValid()) {
            this.props.onAdd(this.ctrls.username.ctrls.field.value);
        }
    }

    handleChange() {
        if (this.isValid()) {
            this.setState({
                btnDisabled: false
            });
        }
    }

    isValid() {
        return ValidationPatterns.minLength(3).test(this.ctrls.username.ctrls.field.value);
    }

    render() {
        return (
            <Popup className="add-friend" title="Add Friend" onCancel={this.props.onCancel} visible={this.props.visible}>
                <TextInput type="text" pattern={ValidationPatterns.minLength(3)} ref={ c => this.ctrls.username = c } label="Username or Email" onChange={this.handleChange.bind(this)}/>
                <div className="actionbar">
                    <Spinner hide={this.props.showLoading} />
                    <Button onClick={this.handleAddFriend.bind(this)} disabled={this.state.btnDisabled || this.props.showLoading} ref={c => this.ctrls.button = c }>Add Friend</Button>
                </div>
            </Popup>
        );
    }
}
