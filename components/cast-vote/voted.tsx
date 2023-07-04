import moment from 'moment';

interface Props {
  voting_ends: string;
}

const Voted = ({ voting_ends }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-black h-full gap-2">
      <p className="text-3xl font-bold text-center">
        {`Thank you for voting, results will be available ${moment(
          voting_ends
        ).format('dddd, MMM Do YYYY @ hh:mm a')} EST`}
      </p>
    </div>
  );
};

export default Voted;
