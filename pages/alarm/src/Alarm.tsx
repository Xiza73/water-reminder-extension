import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { cn, GlassIcon } from '@extension/ui';

const NewTab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const isLight = theme === 'light';

  const audio = new Audio('./alarm.mp3');

  audio.play();

  return (
    <div className={cn('p-5 h-screen', isLight ? 'bg-slate-300' : 'bg-gray-800')}>
      <div
        className={cn(
          'flex flex-col justify-between border-2 h-full rounded-md p-3',
          isLight ? 'border-blue-700 text-blue-700' : 'border-blue-300 text-blue-300',
        )}>
        <h1 className={cn('text-4xl font-bold')}>Time to drink water!</h1>
        <GlassIcon className="self-end" width={50} height={50} />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div> Loading ... </div>), <div> Error Occur </div>);
