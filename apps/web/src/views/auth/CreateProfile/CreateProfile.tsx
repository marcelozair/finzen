import { useForm } from 'react-hook-form';
import './CreateProfile.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaCreateProfile from '../../../validators/SchemaCreateProfile';
import { ICreateProfilePayload } from '../../../interfaces/Auth';
import { $authApi } from '../../../api/modules/auth';
import { useAppDispatch } from '../../../store/hooks';
import { setProfileAction, setSessionAction } from '../../../store/modules/auth';
import { setAuthorizationToken } from '../../../helpers/authorization';
import { useNavigate } from 'react-router-dom';
import { toRoutes } from '../../../routes/routes';

export const CreateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { isValid } } = useForm<ICreateProfilePayload>({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schemaCreateProfile),
  });

  const onSubmit = (values: ICreateProfilePayload) => {
    $authApi.createProfile(values).then((response) => {
      dispatch(setProfileAction(response));

      $authApi.session().then((response) => {
        setAuthorizationToken(response.token);
        dispatch(setSessionAction(response));
        
        navigate(toRoutes.dashboard);
      })
    });
  }

  return (
    <main className="create-profile">
      <form className="create-profile__container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="create-profile__title">Create Your New <span>Profile</span></h2>
        <p>It's important understand that you can administrate a different profiles in the platform.</p>
      
        <input
          {...register('name')}
          autoComplete="off"
          className="create-profile__field"
          placeholder="Insert profile name ..."
        />
       {isValid && <button type="submit" className="create-profile__button">Save and Next</button>}
      </form>
    </main>
  )
};

export default CreateProfile;
