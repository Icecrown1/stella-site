type Aspect = 'video' | 'square' | 'portrait';

const ASPECT_CLASS: Record<Aspect, string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]'
};

export default function PhotoPlaceholder({
  note,
  aspect = 'video'
}: {
  note: string;
  aspect?: Aspect;
}) {
  return (
    <div
      className={`${ASPECT_CLASS[aspect]} w-full rounded-xl2 border-2 border-dashed border-crimson-500/25 bg-sand-100 flex items-center justify-center p-6`}
    >
      <p className="text-center text-sm text-ink-900/40 leading-relaxed">
        Фото · placeholder
        <br />
        {note}
      </p>
    </div>
  );
}
