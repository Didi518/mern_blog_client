import {
  FaFacebookSquare,
  FaRedditSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const SocialShareButton = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=681614680475264&display=popup&href=${url}`}
      >
        <FaFacebookSquare className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaTwitterSquare className="text-[#00acee] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsappSquare className="text-[#25d366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButton;
