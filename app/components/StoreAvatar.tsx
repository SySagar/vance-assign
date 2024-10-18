import Image from 'next/image'

type StoreAvatarProps = {
    id: string
    alt: string
    }
 
export function StoreAvatar({ id, alt }:StoreAvatarProps) {
  return <Image src={`/avatars/${id}.svg`} alt={alt} width="24" height="24" />
}
 