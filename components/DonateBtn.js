import { useRouter } from 'next/router';

function DonateBtn(props) {
    let router = useRouter();
    return (
        <div>
            <section>
          <button onClick={() => { router.push('/donate')}}>
            Checkout
          </button>
        </section>
        <style jsx>
          {`
            section {
              background: #ffffff;
              display: flex;
              flex-direction: column;
              width: 400px;
              border-radius: 6px;
              justify-content: space-between;
            }
            button {
              height: 36px;
              background: #556cd6;
              border-radius: 4px;
              color: white;
              border: 0;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
        </div>
    )
};

export default DonateBtn;