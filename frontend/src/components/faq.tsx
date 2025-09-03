"use client";
import React from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);
    const faqsData = [
        {
            question: 'Comment être sûr d\'être payé ?',
            answer: 'Le client dépose d\'abord l\'argent sur AfriLance (escrow). L\'argent est bloqué et libéré automatiquement une fois la mission validée.'
        },
        {
            question: 'Comment retirer mon argent ?',
            answer: 'Vous pouvez retirer vos gains via Mobile Money (Orange, MTN, Wave), virement bancaire ou prochainement via carte Visa/Mastercard.'
        },
        {
            question: 'Y a-t-il des frais ?',
            answer: 'AfriLance prend une petite commission (10%) sur chaque mission réussie. Pas de frais cachés.'
        },
        {
            question: 'Est-ce que les débutants sont acceptés ?',
            answer: 'Oui ✅. Même sans expérience, vous pouvez créer un profil, ajouter vos compétences et décrocher vos premières missions.'
        },
        {
            question: 'Comment publier une mission ?',
            answer: 'Inscrivez-vous, créez une annonce en précisant vos besoins, votre budget et vos délais. Les freelances intéressés postulent rapidement.'
        },
        {
            question: 'Comment choisir un freelance ?',
            answer: 'Vous pouvez consulter le profil, le portfolio, les notes et les avis laissés par d\'autres clients avant d\'engager un freelance.'
        },
        {
            question: 'Comment mes paiements sont-ils sécurisés ?',
            answer: 'L\'argent est conservé par AfriLance jusqu\'à ce que vous validiez le travail. Vous ne payez que pour un projet livré et conforme.'
        },
        {
            question: 'Y a-t-il un coût pour publier une mission ?',
            answer: 'La publication est gratuite ✅. Vous payez uniquement le freelance choisi, plus une petite commission.'
        },
        {
            question: 'Puis-je annuler une mission ?',
            answer: 'Oui. Tant que le freelance n\'a pas commencé le travail, vous pouvez annuler. Sinon, une médiation AfriLance est possible.'
        },
        {
            question: 'Est-ce qu\'AfriLance est disponible sur mobile ?',
            answer: 'Oui, la plateforme est 100% responsive et une application mobile est en cours de développement.'
        }
    ];

    return (
        <div className='flex flex-col items-center text-center text-slate-800 px-4 py-16'>
            <p className='text-base font-medium text-orange-600'>FAQ</p>
            <h1 className='text-3xl md:text-4xl font-semibold mt-2'>Questions Fréquemment Posées</h1>
            <p className='text-base text-slate-600 mt-4 max-w-2xl'>
                Trouvez rapidement les réponses à vos questions sur AfriLance, notre fonctionnement et nos services.
            </p>
            <div className='max-w-3xl w-full mt-8 flex flex-col gap-4 items-start text-left'>
                {faqsData.map((faq, index) => (
                    <div key={index} className='flex flex-col items-start w-full'>
                        <div 
                            className='flex items-center justify-between w-full cursor-pointer bg-white border border-slate-200 hover:border-orange-300 p-6 rounded-lg transition-colors' 
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <h2 className='text-lg font-medium text-slate-800'>{faq.question}</h2>
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 18 18" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-300 ease-in-out flex-shrink-0 ml-4`}
                            >
                                <path 
                                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" 
                                    stroke="#ea580c" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </div>
                        <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                            <p className='text-base text-slate-600 px-6 py-4 bg-orange-50 border-l-4 border-orange-500'>
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
