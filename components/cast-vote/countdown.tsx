import moment from 'moment';

interface Props {
  voting_starts: string;
}

const Countdown = ({ voting_starts }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-black h-full gap-2">
      <p className="text-3xl font-bold text-center">
        {`The polls will open on ${moment(voting_starts).format(
          'dddd, MMM Do YYYY @ hh:mm a'
        )} EST`}
      </p>
    </div>
  );
};

export default Countdown;
