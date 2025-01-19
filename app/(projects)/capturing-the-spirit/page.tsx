import Image from 'next/image';

export default function CapturingTheSpiritPage() {
    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Image
                src={`/photos/capturing-the-spirit/main.jpg`}
                alt="Capturing the Spirit"
                layout="responsive"
                width={1920}
                height={1080}
            />
        </div>
    );
}