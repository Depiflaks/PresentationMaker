import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from '~/store/redux/actionCreators/actionCreators'

const useAppActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(actionCreators, dispatch)
}

export {
    useAppActions,
}