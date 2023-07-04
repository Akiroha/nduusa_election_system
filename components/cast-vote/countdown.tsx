import moment from 'moment';
import { useEffect, useState } from 'react';

interface Props {
  voting_starts: string;
}

const Countdown = ({ voting_starts }: Props) => {
  //   const start = moment(voting_starts).unix() * 1000;
  //   const now = moment().unix() * 1000;
  //   const diffTime = start - now;
  //   const [duration, setDuration] = useState(
  //     moment.duration(diffTime, 'milliseconds')
  //   );
  //   const time = 1000;

  //   useEffect(() => {
  //     const interval = setInterval(function () {
  //       setDuration((oldDuration: any) => {
  //         return moment.duration(oldDuration - time, 'milliseconds');
  //       });
  //     }, time);
  //     return () => clearInterval(interval);
  //   }, [time]);

  //   return (
  //     <div className="flex flex-col items-center justify-center text-black h-full gap-2">
  //       <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
  //         <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
  //           <span className="countdown font-mono text-5xl">
  //             <span style={{ '--value': duration.days() }}></span>
  //           </span>
  //           days
  //         </div>
  //         <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
  //           <span className="countdown font-mono text-5xl">
  //             <span style={{ '--value': duration.hours() }}></span>
  //           </span>
  //           hours
  //         </div>
  //         <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
  //           <span className="countdown font-mono text-5xl">
  //             <span style={{ '--value': duration.minutes() }}></span>
  //           </span>
  //           min
  //         </div>
  //         <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
  //           <span className="countdown font-mono text-5xl">
  //             <span style={{ '--value': duration.seconds() }}></span>
  //           </span>
  //           sec
  //         </div>
  //       </div>
  //     </div>
  //   );

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
