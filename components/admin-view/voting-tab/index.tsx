import { VotingPositionType } from '@/types';
import { useEffect, useState } from 'react';
import VotingPosition from './voting-position';
import AddEditPositionModal from './modals/add-edit-position-modal';
import { useSupabase } from '@/hooks';

const VotingOptions = () => {
  const [fetching, setFetching] = useState(true);
  const [positions, setPositions] = useState<VotingPositionType[]>([]);
  const [selectedPosition, setSelectedPosition] =
    useState<VotingPositionType | null>(null);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const supabase = useSupabase();

  useEffect(() => {
    const fetchPositions = async () => {
      const { data, error } = await supabase.voting_position.getPositions();

      if (!error && data) {
        setPositions(data);
      }

      setFetching(false);
    };

    fetchPositions();

    const handleEvent = async (payload: any) => {
      const { eventType, new: newValue, old } = payload;

      switch (eventType) {
        case 'INSERT':
          setPositions((update) => {
            if (!update) return update;
            return [...update].concat(newValue satisfies VotingPositionType);
          });
          break;
        case 'UPDATE':
          setPositions((oldArr) => {
            if (!oldArr) return oldArr;
            const update = [...oldArr];
            const oldPositionIndex = update.findIndex((e) => e.id === old.id);

            if (oldPositionIndex === -1) return update;

            update[oldPositionIndex] = newValue;
            return update;
          });
          break;
        case 'DELETE':
          setPositions((oldArr) => {
            if (!oldArr) return oldArr;
            const update = [...oldArr];
            const oldPositionIndex = update.findIndex((e) => e.id === old.id);

            if (oldPositionIndex === -1) return update;

            update.splice(oldPositionIndex, 1);
            return update;
          });

          break;
      }
    };

    const supa = supabase.getSupabase();
    const channel = supa
      .channel('realtime positions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voting_position',
        },
        (payload) => {
          handleEvent(payload);
        }
      )
      .subscribe();

    return () => {
      supa.removeChannel(channel);
    };
  }, []);

  const handleResetState = () => {
    setSelectedPosition(null);
    setShowPositionModal(false);
  };

  if (fetching) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full rounded-xl shadow-2xl">
      <div className="flex justify-end">
        <button
          className="btn btn-xs lg:btn-sm btn-primary"
          onClick={() => setShowPositionModal(true)}
        >
          Add position
        </button>
      </div>
      <div className="h-full overflow-auto p-1 flex flex-col gap-2">
        {positions.map((position) => (
          <VotingPosition key={position.id} position={position} />
        ))}
      </div>

      {showPositionModal && (
        <AddEditPositionModal
          selectedPosition={selectedPosition}
          handleResetState={handleResetState}
        />
      )}
    </div>
  );
};

export default VotingOptions;