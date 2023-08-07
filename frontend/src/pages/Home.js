import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutscontext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();

  // we can't make useEffect as async
  useEffect(() => {
    // fetch data
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      //  array of workout
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json);
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
