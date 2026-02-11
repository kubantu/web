        const { useState, useEffect, useRef } = React;

        // --- Data Lists ---
        const servicesList = [
            { id: 1, title: "Angkut & Susun Barang", icon: "Box", desc: "Bantuan angkut barang menumpuk." },
            { id: 2, title: "Bersih-bersih Rumah", icon: "Home", desc: "Cleaning service harian untuk rumah." },
            { id: 3, title: "Bantu Pindahan", icon: "Truck", desc: "Bantu untuk pindahan rumah atau kost." },
            { id: 4, title: "Jaga Stand Bazar", icon: "Store", desc: "Penjaga pengganti stand event." },
            { id: 5, title: "Setup Acara", icon: "Calendar", desc: "Bantuan dekorasi dan persiapan venue acara." },
            { id: 6, title: "Antar Barang Mendesak", icon: "Zap", desc: "Kurir instan untuk dokumen atau barang penting." },
            { id: 7, title: "Bantu Belanja", icon: "Shopping Bag", desc: "Personal shopper untuk kebutuhan harian/pasar." },
            { id: 8, title: "Asisten Harian", icon: "User Check", desc: "Asisten pribadi fleksibel untuk berbagai tugas." },
            { id: 9, title: "Bantu UMKM Packing", icon: "Package", desc: "Tenaga bantuan packing orderan online shop." },
            { id: 10, title: "Helper Event", icon: "Ticket", desc: "Crew cabutan untuk kelancaran event Anda." },
            { id: 11, title: "Bantu Motor Mogok", icon: "Wrench", desc: "Bantuan darurat untuk dorong atau cek motor mogok." },
            { id: 13, title: "Jaga Hewan Peliharaan", icon: "Cat", desc: "Teman bermain atau feeding untuk hewan kesayangan." },
            { id: 14, title: "Setrika Pakaian", icon: "Shirt", desc: "Jasa setrika rapi per jam di rumah Anda." },
            { id: 15, title: "Temani Lansia", icon: "Heart Handshake", desc: "Teman ngobrol dan pendampingan ringan untuk lansia." },
            { id: 16, title: "Jasa Pasang Plafon", icon: "Hourglass", desc: "Bantu perbaiki plafon rumah yang rusak." },
            { id: 17, title: "Tukang Kebun Ringan", icon: "Sprout", desc: "Siram tanaman, potong rumput, dan rapi-rapi taman." },
            { id: 18, title: "Potong Rumput Halaman", icon: "Footprints", desc: "Deep cleaning halaman kotor jadi bersih." },
            { id: 19, title: "Bantu Masak Persiapan Acara", icon: "Chef Hat", desc: "Asisten potong bahan dan persiapan masak di dapur." },
            { id: 20, title: "Rakit Furniture", icon: "Hammer", desc: "Bantuan merakit lemari atau meja knock-down." },
            { id: 21, title: "Pasang Instalasi Listrik", icon: "Droplet", desc: "Bantuan untuk memasang instalasi listrik." },
            { id: 22, title: "Bersihkan Gudang", icon: "Archive", desc: "Organisir dan bersihkan gudang yang berantakan." },
            { id: 23, title: "Angkat jemuran", icon: "Layers", desc: "Jasa angkat jemuran saat hujan tidak ada di rumah" },
            { id: 24, title: "Bungkus Kado", icon: "Gift", desc: "Jasa bungkus kado estetik untuk orang spesial." },
            { id: 25, title: "Fotografer Acara jalan-jalan", icon: "Camera", desc: "Helper dokumentasi acara/jalan-jalan pakai HP." },
            { id: 12, title: "Lainnya", icon: "More Horizontal", desc: "Punya kebutuhan spesifik? Diskusikan dengan kami." },
        ];

        const testimonialsData = [
            { name: "Sarah M.", role: "Mahasiswa", text: "Sangat membantu saat pindahan kost mendadak! Helpernya ramah dan pekerja keras.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
            { name: "Budi S.", role: "UMKM Owner", text: "Waktu karyawan libur packing orderan tetep beres berkat helper KUBANTU.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" },
            { name: "Lina P.", role: "Ibu Rumah Tangga", text: "Kerja terus sampe lupa bersihin rumah, untung ada helper KUBANTU", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lina" },
            { name: "Rizky A.", role: "Event Organizer", text: "Tenaga kerja fleksibel terbaik, belanja stok produksi jadi ga khawatir lagi.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rizky" }
        ];

        const faqs = [
            { q: "Apakah KUBANTU aman?", a: "Sangat aman. Setiap Helper melalui proses verifikasi identitas (KTP & Wajah) yang ketat. Kami juga memiliki sistem rating transparan." },
            { q: "Siapa saja yang bisa menggunakan KUBANTU?", a: "Siapa saja! Mulai dari mahasiswa, ibu rumah tangga, pemilik UMKM, hingga Event Organizer yang butuh tenaga tambahan." },
            { q: "Bagaimana sistem pembayaran?", a: "Pembayaran dilakukan secara transparan. Estimasi biaya diberikan di awal, dan pembayaran bisa via transfer atau e-wallet setelah konfirmasi admin." },
            { q: "Apakah Helper harus berpengalaman?", a: "Tidak semua kategori butuh pengalaman spesifik, namun kami memberikan briefing standar pelayanan (SOP) kepada semua mitra Helper." },
            { q: "Bagaimana jika terjadi kerusakan?", a: "Kami memiliki layanan perlindungan konsumen dan mediasi untuk setiap insiden yang terjadi selama pengerjaan tugas." },
            { q: "Apakah layanan tersedia 24 jam?", a: "Ya, Request bisa dilakukan 24 jam. Ketersediaan tergantung pada Helper yang aktif di area Anda saat itu." },
        ];

        // --- Custom Hook for Scroll Reveal ---
        const useScrollReveal = (activePage) => {
            useEffect(() => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                        }
                    });
                }, { threshold: 0.1 });

                setTimeout(() => {
                    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
                }, 100);

                return () => observer.disconnect();
            }, [activePage]);
        };

        // --- Components ---

        const Navbar = ({ activePage, navigateTo, isMobileMenuOpen, setIsMobileMenuOpen }) => {
            const navItems = [
                { id: 'home', label: 'Beranda' },
                { id: 'about', label: 'Tentang' },
                { id: 'services', label: 'Butuh Pekerja' },
                { id: 'how-it-works', label: 'Cara Kerja' },
                { id: 'team', label: 'Tim' },
            ];

            return (
                <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-slate-100 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex-shrink-0 flex items-center cursor-pointer btn-click transition-transform" onClick={() => navigateTo('home')}>
                                <span className="text-2xl font-bold font-[Poppins] text-brand-blue tracking-tighter">KUBANTU</span>
                                <span className="w-2 h-2 bg-brand-red rounded-full ml-1 mb-1"></span>
                            </div>
                            
                            <div className="hidden md:flex space-x-8">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => navigateTo(item.id)}
                                        className={`font-medium transition-colors duration-300 ease-in-out btn-click ${
                                            activePage === item.id 
                                            ? 'text-brand-red font-semibold' 
                                            : 'text-slate-600 hover:text-brand-blue'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => navigateTo('register-helper')}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ease-out hover:shadow-lg btn-click ${
                                        activePage === 'register-helper'
                                        ? 'bg-brand-red text-white scale-105'
                                        : 'bg-brand-blue text-white hover:bg-blue-700 hover:scale-105'
                                    }`}
                                >
                                    Daftar Helper
                                </button>
                            </div>

                            <div className="md:hidden flex items-center">
                                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 btn-click">
                                    <i data-lucide={isMobileMenuOpen ? "x" : "menu"} className="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-white border-t border-slate-100 animate-slide-down">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            navigateTo(item.id);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                                            activePage === item.id 
                                            ? 'text-brand-red bg-red-50' 
                                            : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => {
                                        navigateTo('register-helper');
                                    }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-blue font-bold hover:bg-blue-50 transition-colors"
                                >
                                    Daftar Jadi Helper
                                </button>
                            </div>
                        </div>
                    )}
                </nav>
            );
        };

        const Hero = ({ navigateTo }) => (
            <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden hero-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="mb-10 lg:mb-0 reveal">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-brand-blue text-sm font-bold tracking-wide mb-6">
                                🚀 PLATFORM BANTUAN NO. 1 DI INDONESIA
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight mb-6">
                                Kamu Butuh, <br/>
                                <span className="text-brand-red">Kami Bantu.</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Butuh bantuan mendesak? Platform Just in Time kami menghubungkan Anda dengan tenaga ahli yang siap membantu kapan pun dan di mana pun.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button 
                                    onClick={() => navigateTo('services')}
                                    className="px-8 py-4 bg-brand-red text-white font-bold rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 active:scale-95 btn-click flex items-center justify-center gap-2"
                                >
                                    Butuh Bantuan Sekarang <i data-lucide="arrow-right" className="w-5 h-5"></i>
                                </button>
                                <button 
                                    onClick={() => navigateTo('register-helper')}
                                    className="px-8 py-4 bg-white text-brand-blue border-2 border-brand-blue font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 ease-out hover:scale-105 active:scale-95 btn-click flex items-center justify-center gap-2"
                                >
                                    Daftar Jadi Helper
                                </button>
                            </div>
                        </div>
                        <div className="relative reveal">
                            <img 
                                src="https://ik.imagekit.io/kpdqb1tkh/kubantu%20trus.jpeg" 
                                alt="Ilustrasi Aplikasi KUBANTU Indonesia" 
                                className="rounded-2xl shadow-2xl w-full object-cover h-[400px] lg:h-[500px] hover-card"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden md:block border border-slate-100 hover-card">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                                        <i data-lucide="check-circle" className="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Respon Helper</p>
                                        <p className="font-bold text-brand-dark">&lt; 2 Menit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const About = () => {
            const [selectedImgInfo, setSelectedImgInfo] = useState(null);

            const imageDetails = {
                img1: {
                    src: "82959.jpg",
                    fallback: "https://ik.imagekit.io/kpdqb1tkh/kubantu.jpeg",
                    title: "Tantangan Finansial",
                    desc: "Banyak individu yang memiliki tenaga, waktu, dan kemauan untuk bekerja, sekaligus membutuhkan penghasilan tambahan. Keahlian praktis yang mereka miliki menjadi peluang untuk membantu sesama sambil memperoleh pendapatan. Namun, keterbatasan akses dan wadah sering membuat potensi tersebut belum tersalurkan secara optimal."
                },
                img2: {
                    src: "82966.jpg",
                    fallback: "https://ik.imagekit.io/kpdqb1tkh/foto%20untuk%20kubantu.jpeg",
                    title: "Kerja Sama & Solusi",
                    desc: "Di tengah kesibukan dan keterbatasan waktu, banyak orang membutuhkan bantuan tenaga untuk menyelesaikan pekerjaan sehari hari. Mulai dari membersihkan rumah, mengangkat barang, hingga urusan teknis sederhana yang tidak sempat ditangani sendiri. Keadaan ini sering kali membuat kebutuhan tersebut tertunda dan menambah beban aktivitas harian."
                }
            };

            return (
                <section className="py-20 bg-white pt-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 reveal">
                            <h2 className="text-3xl font-bold text-brand-dark">Tentang KUBANTU</h2>
                            <div className="w-61 h-1 bg-brand-red mx-auto mt-4 rounded-full"></div>
                        </div>
                        <div className="w-full mb-12 reveal">
                             <h3 className="text-2xl font-bold mb-4 text-brand-blue text-center">Menjawab Kebutuhan Tenaga Mendesak dan Kebutuhan Finansial Fleksibel</h3>
                             <p className="text-slate-600 text-justify text-lg leading-relaxed mb-4">
                                 Di tengah padatnya aktivitas sehari-hari, kebutuhan mendesak kerap muncul dan sulit ditangani sendiri. Mulai dari membersihkan kost setelah seharian bekerja, mengangkut belanjaan bahan baku produksi, hingga memperbaiki plafon yang bocor.
                             </p>
                             <p className="text-slate-600 text-justify text-lg leading-relaxed">
                                 KUBANTU hadir sebagai platform yang menghubungkan Requester dan Helper secara cepat dan aman. Dengan matching system berbasis lokasi dan pendekatan problem oriented, KUBANTU menjadi solusi dua arah yang efisien dan relevan dengan kebutuhan harian pengguna.
                             </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8 w-full reveal">
                            <div onClick={() => setSelectedImgInfo(imageDetails.img1)} className="cursor-pointer group">
                                <img 
                                    src={imageDetails.img1.src} 
                                    onError={(e) => {e.target.onerror = null; e.target.src=imageDetails.img1.fallback}}
                                    className="rounded-lg shadow-md w-full h-90 object-cover hover-card group-hover:opacity-90 transition-opacity" 
                                    alt="Masalah Urban Collage" 
                                />
                                <p className="text-center text-sm text-brand-blue mt-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Klik untuk detail</p>
                            </div>
                            <div onClick={() => setSelectedImgInfo(imageDetails.img2)} className="cursor-pointer group">
                                <img 
                                    src={imageDetails.img2.src} 
                                    onError={(e) => {e.target.onerror = null; e.target.src=imageDetails.img2.fallback}}
                                    className="rounded-lg shadow-md w-full h-90 object-cover hover-card group-hover:opacity-90 transition-opacity" 
                                    alt="Masalah Finansial" 
                                />
                                <p className="text-center text-sm text-brand-blue mt-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Klik untuk detail</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8 reveal">
                            {[
                                "Teknologi yang memanusiakan pekerja",
                                "Ekosistem saling membantu",
                                "Fleksibilitas untuk semua"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-full">
                                        <i data-lucide="check" className="text-brand-red w-5 h-5"></i>
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modal for About Images */}
                    {selectedImgInfo && (
                        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in" onClick={() => setSelectedImgInfo(null)}>
                            <div className="bg-white text-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
                                <button 
                                    onClick={() => setSelectedImgInfo(null)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors btn-click"
                                >
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                                <div className="text-center">
                                    <img 
                                        src={selectedImgInfo.src} 
                                        onError={(e) => {e.target.onerror = null; e.target.src=selectedImgInfo.fallback}}
                                        className="w-full h-48 object-cover rounded-xl mb-6 shadow-sm"
                                        alt={selectedImgInfo.title}
                                    />
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">{selectedImgInfo.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-justify">
                                        {selectedImgInfo.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            );
        };

        const Features = () => {
            const [selectedFeature, setSelectedFeature] = useState(null);

            const featureData = [
                { 
                    icon: "Clock", 
                    title: "Respon Kilat", 
                    desc: "Fokus pada kebutuhan mendesak dengan respon admin dan helper < 2 menit.",
                    detail: "Kami mengerti arti 'mendesak'. Sistem KUBANTU dirancang untuk memberikan notifikasi real-time kepada admin dan helper terdekat. Rata-rata waktu dari pemesanan hingga konfirmasi adalah kurang dari 5 menit, memastikan bantuan datang tepat saat Anda membutuhkannya."
                },
                { 
                    icon: "ShieldCheck", 
                    title: "Aman & Terpercaya", 
                    desc: "Verifikasi identitas ketat untuk setiap Helper yang bergabung.",
                    detail: "Keamanan adalah prioritas utama kami. Setiap Helper yang bergabung dengan KUBANTU telah melalui proses verifikasi KTP dan wajah yang ketat. Kami juga memantau setiap transaksi dan menyediakan layanan dukungan pelanggan untuk memastikan pengalaman yang aman bagi semua pihak."
                },
                { 
                    icon: "Users", 
                    title: "Problem Oriented", 
                    desc: "Menyelesaikan masalah sehari-hari dan mendukung ekonomi masyarakat",
                    detail: "KUBANTU dibangun dengan asas penyelesaian masalah. Kami memberdayakan mahasiswa, feelancer, hingga pekerja paruh waktu untuk mendapatkan penghasilan tambahan yang layak. Dengan menggunakan KUBANTU, Anda tidak hanya mendapatkan bantuan, tetapi juga turut berkontribusi dalam memutar roda ekonomi masyarakat sekitar."
                }
            ];

            return (
                <section className="py-20 bg-slate-900 text-white relative">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="grid md:grid-cols-3 gap-8">
                            {featureData.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => setSelectedFeature(item)}
                                    className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 reveal cursor-pointer group"
                                >
                                    <i data-lucide={item.icon} className="w-12 h-12 text-brand-blue mb-4"></i>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-slate-400">{item.desc}</p>
                                    <p className="text-xs text-brand-blue mt-4 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Klik untuk detail</p>
                                </div>
                            ))}
                         </div>
                     </div>

                     {/* Modal Feature Detail */}
                     {selectedFeature && (
                        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in" onClick={() => setSelectedFeature(null)}>
                            <div className="bg-white text-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
                                <button 
                                    onClick={() => setSelectedFeature(null)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors btn-click"
                                >
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                        <i data-lucide={selectedFeature.icon} className="w-8 h-8"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">{selectedFeature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-justify">
                                        {selectedFeature.detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                     )}
                </section>
            );
        };

        const Testimonials = () => (
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 reveal">
                        <h2 className="text-3xl font-bold text-brand-dark">Apa Kata Mereka?</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6 reveal">
                        {testimonialsData.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover-card border border-slate-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full bg-slate-200" />
                                    <div>
                                        <h4 className="font-bold text-sm text-brand-dark">{item.name}</h4>
                                        <p className="text-xs text-slate-500">{item.role}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 italic">"{item.text}"</p>
                                <div className="flex text-yellow-400 mt-3 text-xs">
                                    {[1,2,3,4,5].map(i => <i key={i} data-lucide="star" className="w-3 h-3 fill-current"></i>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );

        const UserTargets = () => (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 reveal">
                        <h2 className="text-3xl font-bold text-brand-dark">Target Pengguna</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-red-50 p-8 rounded-2xl border border-red-100 hover-card reveal">
                            <h3 className="text-2xl font-bold text-brand-red mb-4">Requester</h3>
                            <p className="mb-4 text-slate-700">Mahasiswa, Pekerja Penuh Waktu, Keluarga Perkotaan, UMKM, dan Event Organizer.</p>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Butuh bantuan mendesak (urgent)</li>
                                <li>• Efisiensi waktu dan tenaga</li>
                                <li>• Membutuhkan tenaga tambahan temporer</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 hover-card reveal">
                            <h3 className="text-2xl font-bold text-brand-blue mb-4">Helper</h3>
                            <p className="mb-4 text-slate-700">Mahasiswa, Freelancer, Pekerja Paruh Waktu.</p>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Penghasilan tambahan fleksibel</li>
                                <li>• Memanfaatkan waktu luang</li>
                                <li>• Membangun koneksi dan pengalaman</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );

        const TrustSafety = () => {
            const [selectedItem, setSelectedItem] = useState(null);

            const items = [
                { 
                    icon: "file-check", 
                    title: "Verifikasi KTP", 
                    desc: "Setiap Helper wajib mengunggah KTP dan melakukan verifikasi wajah untuk menjamin keaslian identitas." 
                },
                { 
                    icon: "star", 
                    title: "Rating Transparan", 
                    desc: "Sistem ulasan dua arah yang jujur membantu menjaga kualitas layanan dan kepercayaan komunitas." 
                },
                { 
                    icon: "lock", 
                    title: "Escrow System", 
                    desc: "Pembayaran Anda aman di sistem kami dan hanya diteruskan ke Helper setelah pekerjaan selesai dikonfirmasi." 
                },
                { 
                    icon: "heart-handshake", 
                    title: "Customer Protection", 
                    desc: "Layanan dukungan pelanggan siap membantu menengahi jika terjadi kendala selama pengerjaan tugas." 
                }
            ];

            return (
                <section className="py-10 bg-slate-50 border-y border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 text-center reveal">
                        <h2 className="text-3xl font-bold mb-12 text-brand-dark">Keamanan & Kepercayaan</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {items.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => setSelectedItem(item)}
                                    className="flex flex-col items-center hover-card p-4 cursor-pointer group"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 text-brand-blue transition-colors group-hover:bg-blue-50">
                                        <i data-lucide={item.icon} className="w-8 h-8"></i>
                                    </div>
                                    <h4 className="font-bold text-brand-dark group-hover:text-brand-blue transition-colors">{item.title}</h4>
                                    <p className="text-xs text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Klik untuk detail</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modal for Trust Items */}
                    {selectedItem && (
                        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in" onClick={() => setSelectedItem(null)}>
                            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative text-center" onClick={e => e.stopPropagation()}>
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors btn-click"
                                >
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                                <div className="w-20 h-20 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i data-lucide={selectedItem.icon} className="w-10 h-10"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-4">{selectedItem.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {selectedItem.desc}
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            );
        };

        const BusinessModel = () => (
             <section className="py-10 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center reveal">
                    <h2 className="text-3xl font-bold mb-8 text-brand-dark">Model Bisnis</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-semibold border border-slate-200 shadow-sm hover:shadow-md transition-shadow">Advertisement</span>
                        <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-semibold border border-slate-200 shadow-sm hover:shadow-md transition-shadow">Komisi Transaksi (20%)</span>
                        <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-semibold border border-slate-200 shadow-sm hover:shadow-md transition-shadow">Membership</span>
                    </div>
                </div>
             </section>
        );

        const Team = ({ activeTeamMember, setActiveTeamMember }) => {
            const teamMembers = [
                { 
                    name: "Muhamad Renaldy Saputra", 
                    role: "COO & CTO", 
                    img: "foto_rifki.jpg", 
                    fallback: "https://ik.imagekit.io/kpdqb1tkh/renaldy%20baru%20kubantu.jpeg",
                    bio: "Renaldy memiliki banyak prestasi, diantaranya: Juara 3 International Business Plan Competition Warmadewa University (2026), Juara 3 National Business Plan Competition ICON VIII x EDOV XI (2025), Juara 3 National Business Plan Competition Enfair VII Hipmi PT Unand (2025), Juara Harapan 1 Debat National University Debating Championship UNRI (2024), Juara 1 Debat Almadani EXPO (2025), Head of Division Educational EFEC (2025), Member of Human Resources Development EFEC (2024), Project Leader of Brotherhood EFEC (2024), Publikasi 4 Artikel Ilmiah di Journal Terakreditasi (2025), Semifinalist Business Case Competition IISE Universitas Indonesia (2024), CEO Project Business Model Canvas Deodorant (2024), Finalist Lomba Debat Sosiologi Expo Tingkat Nasional (2025), Vice Project Manager of Equipment Division in English Festival (2024), CEO Project Business Innovation Pisang Cream Varian Rasa (2024), Project Manager of Equipment Division in Famgath x ACT 2 (2024), Best Participant of Famgath x ACT 2 (2024)"
                },
                { 
                    name: "Rifki Arohman", 
                    role: "CEO & CFO", 
                    img: "foto_renaldy.jpg", 
                    fallback: "https://ik.imagekit.io/kpdqb1tkh/rifki%20baru%20kubantu.jpeg",
                    bio: "Rifki memiliki banyak prestasi, diantaranya: Juara 3 International Business Plan Competition Warmadewa University (2026) Juara 2 National Business Plan Competition Manfest (2025), Juara 3 National Business Plan Competition ICON VIII x EDOV XI (2025), Juara 3 National Business Plan Competition Enfair VII Hipmi PT Unand (2025), Juara Harapan 1 National Business Plan Competition ITB-I EXPO (2024), Delegasi UNRI Kompetisi Bisnis Manajemen dan Keuangan Puspresnas (2024), Publikasi 13 Artikel Ilmiah di Journal Terakreditasi (2025), Juara 1 Mahasiswa Berprestasi Junior UNRI (2024), Juara 1 Mahasiswa Berprestasi Junior FEB UNRI (2024), Juara 1 Mahasiswa Berprestasi Junior Manajemen FEB UNRI (2024), Juara 1 Mahasiswa Baru Berprestasi UNRI (2023), Juara 1 Mahasiswa Baru Berprestasi FEB UNRI (2023), Juara 1 Mahasiswa Baru Berprestasi Manajemen FEB UNRI (2023), Awardee Beasiswa Teladan Tanoto Foundation (2024), Project Leader TSA Assemble oleh UNAND, USU, dan UNRI (2024), Juri Cipta Puisi 3x Tingkat Nasional oleh Media Bara Pustaka (2024)"
                },
                { 
                    name: "Rahmat Kurniawan", 
                    role: "CMO & CIO", 
                    img: "foto_rahmat.jpg", 
                    fallback: "https://ik.imagekit.io/kpdqb1tkh/rahmat%20baru%20kubantu.jpeg",
                    bio: "Rahmat memiliki banyak prestasi, diantaranya: Juara 3 International Business Plan Competition Warmadewa University 2026, Juara 3 National Business Plan Competition ICON VIII x EDOV XI 2025, Juara 3 National Business Plan Competition Enfair VII Hipmi PT Unand 2025, Juara 1 lomba Business Plan Competition Tingkat Nasional SAC UNRI 2025, Juara 3 Lomba Film Pendek NIFC 3.0 UMRI 2024, Kepala Sub Dinas Akademik Dinas Akpresma BEM FEB UNRI Periode 2025, Ketua Pelaksana Acara Scholarship Day BEM FEB UNRI 2025, Juara Harapan 1 Business Plan Competition ITB-I EXPO 2024, CTO Proyek Business Veggiesweets 2024, CTO Proyek Business Edulink 2024, Committee of PKKMB FEB UNRI 2025, Koordinator konsumsi sosialisasi PKM&P2MW 2025, Artfest Committee SS 412 bidang pendanaan, Master of Ceremony Manajemen Student Competition 2023, Master of Ceremony Manajemen Futsal Cup 2025"
                },
            ];
            return (
                <section className="py-20 bg-slate-50 pt-32">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-12 text-brand-dark reveal">Tim Pendiri</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {teamMembers.map((member, idx) => (
                                <div 
                                    key={idx} 
                                    className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover-card reveal"
                                    onClick={() => setActiveTeamMember(member)}
                                >
                                    <img 
                                        src={member.img} 
                                        onError={(e) => {e.target.onerror = null; e.target.src = member.fallback}}
                                        alt={member.name} 
                                        className="w-24 h-24 rounded-full mx-auto mb-4 bg-slate-100 p-1 object-cover" 
                                    />
                                    {/* whitespace-pre-line handles the newline character */}
                                    <h3 className="text-xl font-bold text-brand-dark whitespace-pre-line">{member.name}</h3>
                                    <p className="text-slate-500 font-medium">{member.role}</p>
                                    <p className="text-xs text-brand-blue mt-2 font-medium">Klik untuk melihat bio</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modal for Bio */}
                    {activeTeamMember && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm page-fade-in">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                                <button 
                                    onClick={() => setActiveTeamMember(null)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors btn-click"
                                >
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                                <div className="text-center">
                                    <img 
                                        src={activeTeamMember.img} 
                                        onError={(e) => {e.target.onerror = null; e.target.src = activeTeamMember.fallback}}
                                        alt={activeTeamMember.name} 
                                        className="w-32 h-32 rounded-full mx-auto mb-6 bg-slate-50 p-2 object-cover" 
                                    />
                                    <h3 className="text-2xl font-bold text-brand-dark mb-2 whitespace-pre-line">{activeTeamMember.name}</h3>
                                    <p className="text-brand-blue font-semibold mb-4">{activeTeamMember.role}</p>
                                    <p className="text-slate-600 leading-relaxed">
                                        {activeTeamMember.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            );
        };

        const ImpactSection = () => {
            const [selectedImpact, setSelectedImpact] = useState(null);

            const impacts = [
                {
                    id: 1,
                    number: "10.000+",
                    label: "Jam Terselamatkan",
                    subtitle: "Waktu berharga requester yang berhasil dihemat.",
                    icon: "clock",
                    theme: "blue", 
                    description: "Dengan sistem 'Just in Time' kami, KUBANTU telah berhasil menghemat lebih dari 10.000 jam waktu produktif pengguna. Bayangkan waktu yang biasanya terbuang untuk antri, macet, atau mencari tenaga bantuan manual, kini bisa digunakan untuk hal yang lebih penting seperti keluarga, hobi, atau pengembangan bisnis."
                },
                {
                    id: 2,
                    number: "2.000+",
                    label: "Mahasiswa, Freelancer & Pekerja Paruh Waktu Terbantu",
                    subtitle: "Mendapat penghasilan tambahan fleksibel.",
                    icon: "users",
                    theme: "red",
                    description: "KUBANTU bukan sekadar aplikasi, tapi jaring pengaman sosial bagi mahasiswa. Lebih dari 2.000 mahasiswa, freelancer & pekerja paruh waktu kini memiliki akses ke penghasilan tambahan tanpa mengganggu jadwal mereka. Mereka bisa mengambil pekerjaan di sela-sela keseharian, membantu membayar kebutuhan hidup secara mandiri."
                },
                {
                    id: 3,
                    number: "500+",
                    label: "UMKM Didukung",
                    subtitle: "Bantuan packing dan operasional usaha.",
                    icon: "store",
                    theme: "green",
                    description: "UMKM seringkali kewalahan saat pesanan membludak namun tidak sanggup merekrut karyawan tetap. Helper KUBANTU hadir sebagai solusi tenaga kerja fleksibel untuk 500+ UMKM lokal, mulai dari melipat kemasan hingga menjaga stand bazar."
                }
            ];

            const getThemeClasses = (theme) => {
                if (theme === 'blue') return { bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-100', text: 'text-brand-blue' };
                if (theme === 'red') return { bg: 'bg-red-50', border: 'border-red-100', iconBg: 'bg-red-100', text: 'text-brand-red' };
                if (theme === 'green') return { bg: 'bg-green-50', border: 'border-green-100', iconBg: 'bg-green-100', text: 'text-green-600' };
                return {};
            };

            return (
                <section className="py-16 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-10 text-brand-dark reveal">Dampak & Fakta Seru</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {impacts.map((item) => {
                                const theme = getThemeClasses(item.theme);
                                return (
                                    <div 
                                        key={item.id} 
                                        onClick={() => setSelectedImpact(item)}
                                        className={`p-6 ${theme.bg} rounded-2xl border ${theme.border} hover-card cursor-pointer group reveal`}
                                    >
                                        <div className={`w-14 h-14 ${theme.iconBg} ${theme.text} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                            <i data-lucide={item.icon} className="w-8 h-8"></i>
                                        </div>
                                        <h3 className={`text-4xl font-extrabold ${theme.text} mb-2`}>{item.number}</h3>
                                        <p className="text-slate-600 font-medium">{item.label}</p>
                                        <p className="text-xs text-slate-500 mt-2">{item.subtitle}</p>
                                        <p className={`text-xs ${theme.text} mt-4 font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>Klik untuk detail</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Modal */}
                    {selectedImpact && (
                        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm page-fade-in" onClick={() => setSelectedImpact(null)}>
                            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative text-center" onClick={e => e.stopPropagation()}>
                                <button 
                                    onClick={() => setSelectedImpact(null)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors btn-click"
                                >
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                                {(() => {
                                    const theme = getThemeClasses(selectedImpact.theme);
                                    return (
                                        <>
                                            <div className={`w-16 h-16 ${theme.iconBg} ${theme.text} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                                <i data-lucide={selectedImpact.icon} className="w-8 h-8"></i>
                                            </div>
                                            <h3 className="text-2xl font-bold text-brand-dark mb-1">{selectedImpact.number} {selectedImpact.label}</h3>
                                            <div className="w-16 h-1 bg-slate-200 mx-auto my-4 rounded-full"></div>
                                            <p className="text-slate-600 leading-relaxed text-justify">
                                                {selectedImpact.description}
                                            </p>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </section>
            );
        };

        const CSChat = () => {
            const [isOpen, setIsOpen] = useState(false);
            const [messages, setMessages] = useState([]);
            const [input, setInput] = useState("");

            const handleSend = (e) => {
                e.preventDefault();
                if (!input.trim()) return;
                
                const newMsgs = [...messages, { text: input, sender: 'user' }];
                setMessages(newMsgs);
                setInput("");

                setTimeout(() => {
                    setMessages(prev => [...prev, { 
                        text: "Halo Dewan Juri, terima kasih telah menghubungi KUBANTU. Ada yang bisa kami bantu mengenai penilaian atau fitur aplikasi kami?", 
                        sender: 'bot' 
                    }]);
                }, 1000);
            };

            return (
                <div className="mt-12 max-w-2xl mx-auto px-4 reveal">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-brand-blue p-4 text-white font-bold flex justify-between items-center">
                            <span>Layanan Pelanggan (CS)</span>
                            <i data-lucide="message-square" className="w-5 h-5"></i>
                        </div>
                        <div className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-50">
                            {messages.length === 0 && <p className="text-center text-slate-400 text-sm mt-4">Hubungi kami jika ada pertanyaan...</p>}
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-brand-blue text-white rounded-br-none' : 'bg-white shadow-sm border rounded-bl-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex gap-2 bg-white">
                            <input 
                                type="text" 
                                className="flex-grow p-2 text-sm border rounded-lg"
                                placeholder="Ketik pesan Anda..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button type="submit" className="bg-brand-blue text-white p-2 rounded-lg hover:bg-blue-700"><i data-lucide="send" className="w-4 h-4"></i></button>
                        </form>
                    </div>
                </div>
            );
        };

        const HowItWorks = () => (
            <section className="py-20 bg-white pt-32">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-3xl font-bold text-brand-dark">Cara Kerja</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Requester Flow */}
                        <div className="reveal">
                            <h3 className="text-xl font-bold text-brand-red mb-6 flex items-center gap-2">
                                <i data-lucide="user" className="w-6 h-6"></i> Alur Requester
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { title: "Pilih Bantuan", desc: "Pilih kategori pekerjaan yang Anda butuhkan di menu 'Butuh Pekerja'." },
                                    { title: "Isi Detail & Lokasi", desc: "Deskripsikan tugas dan pin lokasi pada peta." },
                                    { title: "Terhubung Admin", desc: "Sistem mengarahkan Anda ke WhatsApp Admin untuk validasi pembayaran." },
                                    { title: "Helper Datang", desc: "Admin mengirimkan Helper terdekat ke lokasi Anda." }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 hover-card p-4 rounded-xl border border-transparent hover:border-slate-100 bg-white">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-brand-red font-bold flex items-center justify-center">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark">{step.title}</h4>
                                            <p className="text-sm text-slate-600">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Helper Flow */}
                        <div className="reveal">
                            <h3 className="text-xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                                <i data-lucide="briefcase" className="w-6 h-6"></i> Alur Helper
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { title: "Daftar & Verifikasi", desc: "Isi formulir pendaftaran dan upload identitas untuk verifikasi." },
                                    { title: "Terima Notifikasi", desc: "Dapatkan info pekerjaan sesuai lokasi dan keahlian Anda." },
                                    { title: "Kerjakan Tugas", desc: "Datang ke lokasi Requester dan selesaikan tugas dengan baik." },
                                    { title: "Dapatkan Bayaran", desc: "Terima pembayaran tunai atau transfer setelah tugas selesai." }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 hover-card p-4 rounded-xl border border-transparent hover:border-slate-100 bg-white">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-brand-blue font-bold flex items-center justify-center">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark">{step.title}</h4>
                                            <p className="text-sm text-slate-600">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CS Chat */}
                    <CSChat />
                 </div>
            </section>
        );

        const FAQ = () => {
            const [openIndex, setOpenIndex] = useState(null);

            return (
                <section className="py-10 bg-white">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark reveal">Pertanyaan Umum</h2>
                        <div className="space-y-4 reveal">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-slate-200 rounded-lg overflow-hidden transition-all hover:border-slate-300">
                                    <button 
                                        className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-medium text-slate-800"
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    >
                                        {faq.q}
                                        <i data-lucide={openIndex === index ? "chevron-up" : "chevron-down"} className="w-5 h-5 text-slate-500 transition-transform"></i>
                                    </button>
                                    {openIndex === index && (
                                        <div className="p-4 bg-white text-slate-600 border-t border-slate-100 page-fade-in">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );
        };

        const MapPicker = ({ onLocationSelect }) => {
            const mapRef = useRef(null);
            const markerRef = useRef(null);
            const [searchQuery, setSearchQuery] = useState("");
            
            useEffect(() => {
                if (!mapRef.current) {
                    const map = L.map('mapid').setView([3.5952, 98.6722], 13);
                    
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);
                    
                    map.on('click', function(e) {
                        const { lat, lng } = e.latlng;
                        if (markerRef.current) {
                            markerRef.current.setLatLng(e.latlng);
                        } else {
                            markerRef.current = L.marker(e.latlng).addTo(map);
                        }
                        onLocationSelect({ lat, lng });
                    });
                    
                    mapRef.current = map;
                }
            }, []);

            const handleSearch = async (e) => {
                e.preventDefault();
                if (!searchQuery) return;
                
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
                    const data = await response.json();
                    
                    if (data && data.length > 0) {
                        const { lat, lon } = data[0];
                        const newLatLng = new L.LatLng(lat, lon);
                        
                        mapRef.current.setView(newLatLng, 15);
                        
                        if (markerRef.current) {
                            markerRef.current.setLatLng(newLatLng);
                        } else {
                            markerRef.current = L.marker(newLatLng).addTo(mapRef.current);
                        }
                        
                        onLocationSelect({ lat: parseFloat(lat), lng: parseFloat(lon) });
                    } else {
                        alert("Lokasi tidak ditemukan. Coba kata kunci lain.");
                    }
                } catch (error) {
                    console.error("Search failed:", error);
                    alert("Gagal mencari lokasi. Periksa koneksi internet Anda.");
                }
            };

            return (
                <div className="w-full space-y-4">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-grow p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                            placeholder="Cari lokasi (contoh: Medan Mall, Jl. Diponegoro)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                        />
                        <button 
                            onClick={handleSearch}
                            className="bg-brand-blue text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <i data-lucide="search" className="w-5 h-5"></i>
                        </button>
                    </div>

                    <div id="mapid" className="border-2 border-slate-200 shadow-inner"></div>
                    <p className="text-xs text-slate-500 mt-2 text-center">Klik pada peta atau gunakan pencarian untuk menandai lokasi bantuan</p>
                </div>
            );
        };

        const MapTracking = ({ userLocation }) => {
            const mapRef = useRef(null);
            const animationRef = useRef(null);
            const helperMarkerRef = useRef(null);
            
            const [helperInfo] = useState(() => {
                const names = [
                    "Muhammad Alif Pratama", 
                    "Rizky Ramadhan Saputra", 
                    "Ahmad Fikri Hidayat", 
                    "Dimas Arya Nugraha", 
                    "Farhan Akmal Maulana"
                ];
                const randomRating = (4.9 + Math.random() * 0.1).toFixed(1);
                
                return {
                    name: names[Math.floor(Math.random() * names.length)],
                    rating: randomRating, 
                    jobs: Math.floor(Math.random() * 200) + 50
                };
            });
            
            useEffect(() => {
                if (!mapRef.current && userLocation) {
                    const startLat = userLocation.lat + 0.008;
                    const startLng = userLocation.lng + 0.008;
                    const startPos = L.latLng(startLat, startLng);
                    const endPos = L.latLng(userLocation.lat, userLocation.lng);

                    const map = L.map('tracking-map').setView([userLocation.lat, userLocation.lng], 14);
                    
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    L.marker(endPos).addTo(map)
                        .bindPopup("Lokasi Anda").openPopup();

                    const helperIcon = L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });

                    const helperMarker = L.marker(startPos, {icon: helperIcon}).addTo(map);
                    helperMarkerRef.current = helperMarker;

                    if (L.Routing) {
                        const control = L.Routing.control({
                            waypoints: [startPos, endPos],
                            routeWhileDragging: false,
                            draggableWaypoints: false,
                            addWaypoints: false,
                            fitSelectedRoutes: true,
                            show: false, 
                            createMarker: function() { return null; }, 
                            lineOptions: {
                                styles: [{color: 'red', opacity: 0.8, weight: 5}]
                            }
                        }).addTo(map);

                        control.on('routesfound', function(e) {
                            const routes = e.routes;
                            const coordinates = routes[0].coordinates; 
                            
                            const duration = 20000;
                            let startTimestamp = null;

                            const animate = (timestamp) => {
                                if (!startTimestamp) startTimestamp = timestamp;
                                const progress = (timestamp - startTimestamp) / duration;

                                if (progress < 1) {
                                    const totalPoints = coordinates.length;
                                    const floatIndex = progress * (totalPoints - 1);
                                    const index = Math.floor(floatIndex);
                                    const nextIndex = Math.min(index + 1, totalPoints - 1);
                                    const segmentProgress = floatIndex - index;

                                    const p1 = coordinates[index];
                                    const p2 = coordinates[nextIndex];

                                    const currentLat = p1.lat + (p2.lat - p1.lat) * segmentProgress;
                                    const currentLng = p1.lng + (p2.lng - p1.lng) * segmentProgress;

                                    helperMarker.setLatLng([currentLat, currentLng]);
                                    animationRef.current = requestAnimationFrame(animate);
                                } else {
                                    helperMarker.setLatLng(endPos);
                                    helperMarker.bindPopup("Helper Tiba!").openPopup();
                                }
                            };
                            animationRef.current = requestAnimationFrame(animate);
                        });

                    } else {
                        L.polyline([startPos, endPos], {color: 'red', weight: 4, dashArray: '5, 10'}).addTo(map);
                        
                        const duration = 20000; 
                        let startTimestamp = null;
                        const animate = (time) => {
                            if (!startTimestamp) startTimestamp = time;
                            const progress = (time - startTimestamp) / duration;

                            if (progress < 1) {
                                const currentLat = startPos.lat + (endPos.lat - startPos.lat) * progress;
                                const currentLng = startPos.lng + (endPos.lng - startPos.lng) * progress;
                                helperMarker.setLatLng([currentLat, currentLng]);
                                animationRef.current = requestAnimationFrame(animate);
                            } else {
                                helperMarker.setLatLng(endPos);
                                helperMarker.bindPopup("Helper Tiba!").openPopup();
                            }
                        };
                        animationRef.current = requestAnimationFrame(animate);
                    }
                    
                    mapRef.current = map;
                }

                return () => {
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                }
            }, [userLocation]);

            return (
                <div className="w-full mt-6">
                     <h4 className="font-bold text-center mb-2">Pantau Helper Anda</h4>
                    <div id="tracking-map" className="border-2 border-brand-blue shadow-lg"></div>
                    <div className="flex justify-between text-xs mt-2 px-2">
                        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Anda</span>
                        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Helper (Sedang Jalan)</span>
                    </div>
                    
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-md border border-slate-100 flex items-center gap-4 fade-in">
                        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                            <i data-lucide="user" className="w-6 h-6 text-slate-500"></i>
                        </div>
                        <div className="text-left">
                            <h5 className="font-bold text-brand-dark text-sm">Helper Ditemukan!</h5>
                            <p className="text-slate-800 font-semibold">{helperInfo.name}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span className="flex items-center gap-1 text-yellow-500 font-bold"><i data-lucide="star" className="w-3 h-3 fill-current"></i> {helperInfo.rating}</span>
                                <span>• {helperInfo.jobs} Pekerjaan Selesai</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        const ServiceBooking = () => {
            const [step, setStep] = useState(1); // 1: List, 2: Form, 3: Map, 4: Success
            const [selectedService, setSelectedService] = useState(null);
            const [details, setDetails] = useState('');
            const [location, setLocation] = useState(null);
            const [showTracking, setShowTracking] = useState(false);

            const handleServiceClick = (service) => {
                setSelectedService(service);
                setStep(2);
                setTimeout(() => window.scrollTo(0, 0), 100);
            };

            const handleFormSubmit = (e) => {
                e.preventDefault();
                setStep(3); 
            };

            const handleMapConfirm = () => {
                if (!location) {
                    alert("Silakan pilih lokasi pada peta terlebih dahulu.");
                    return;
                }
                setStep(4);
            };

            const redirectToWA = () => {
                const adminPhone = "6283180253832";
                const mapLink = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
                const message = `Halo Admin KUBANTU, saya butuh bantuan:\n\n*Jasa:* ${selectedService.title}\n*Keterangan:* ${details}\n*Lokasi:* ${mapLink}\n\nMohon segera dicarikan Helper. Terima kasih.`;
                const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
                
                window.open(url, '_blank');
                setShowTracking(true);
            };

            return (
                <section id="booking-section" className="py-20 bg-slate-50 pt-32 min-h-screen">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 reveal">
                            <h2 className="text-3xl font-bold text-brand-dark">Butuh Pekerja</h2>
                            <p className="text-slate-600 mt-2">Pilih jenis bantuan yang Anda butuhkan saat ini</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 reveal">
                            {/* Step Indicator */}
                            <div className="bg-brand-dark p-4 flex justify-between items-center text-white text-sm overflow-x-auto">
                                <div className={`flex items-center gap-2 whitespace-nowrap ${step >= 1 ? 'text-brand-red font-bold' : 'text-slate-500'}`}>1. Pilih Jasa</div>
                                <div className="h-0.5 w-8 bg-slate-700 min-w-[20px]"></div>
                                <div className={`flex items-center gap-2 whitespace-nowrap ${step >= 2 ? 'text-brand-red font-bold' : 'text-slate-500'}`}>2. Detail</div>
                                <div className="h-0.5 w-8 bg-slate-700 min-w-[20px]"></div>
                                <div className={`flex items-center gap-2 whitespace-nowrap ${step >= 3 ? 'text-brand-red font-bold' : 'text-slate-500'}`}>3. Lokasi</div>
                                <div className="h-0.5 w-8 bg-slate-700 min-w-[20px]"></div>
                                <div className={`flex items-center gap-2 whitespace-nowrap ${step >= 4 ? 'text-brand-red font-bold' : 'text-slate-500'}`}>4. Konfirmasi</div>
                            </div>

                            <div className="p-8">
                                {/* STEP 1: SERVICE LIST */}
                                {step === 1 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {servicesList.map(service => (
                                            <button 
                                                key={service.id}
                                                onClick={() => handleServiceClick(service)}
                                                className="flex flex-col items-center p-4 rounded-xl border border-slate-200 hover:border-brand-red hover:bg-red-50 transition-all duration-300 ease-out hover:scale-105 active:scale-95 text-center group h-full btn-click"
                                            >
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue mb-3 group-hover:bg-red-100 group-hover:text-brand-red transition-colors">
                                                    <i data-lucide={service.icon.toLowerCase()} className="w-6 h-6"></i>
                                                </div>
                                                <h4 className="font-semibold text-sm text-brand-dark mb-1">{service.title}</h4>
                                                <p className="text-xs text-slate-500 line-clamp-2">{service.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* STEP 2: FORM DETAIL */}
                                {step === 2 && (
                                    <div className="max-w-lg mx-auto page-fade-in">
                                        <button onClick={() => setStep(1)} className="mb-4 text-sm text-slate-500 hover:text-brand-blue flex items-center gap-1">
                                            <i data-lucide="arrow-left" className="w-4 h-4"></i> Kembali
                                        </button>
                                        <h3 className="text-xl font-bold mb-4">Detail Kebutuhan: {selectedService.title}</h3>
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsikan kebutuhan Anda secara detail</label>
                                                <textarea 
                                                    required
                                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                                    rows="4"
                                                    placeholder="Contoh: Saya butuh bantuan angkut lemari dan meja belajar ke lantai 2..."
                                                    value={details}
                                                    onChange={(e) => setDetails(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg active:scale-95 btn-click">
                                                Lanjut ke Peta
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* STEP 3: MAP */}
                                {step === 3 && (
                                    <div className="max-w-2xl mx-auto text-center page-fade-in">
                                        <h3 className="text-xl font-bold mb-2">Tentukan Lokasi Anda</h3>
                                        <p className="text-sm text-slate-600 mb-6">Klik pada peta di mana Helper harus datang.</p>
                                        
                                        <MapPicker onLocationSelect={setLocation} />
                                        
                                        <div className="mt-6 flex justify-between">
                                            <button onClick={() => setStep(2)} className="text-slate-500 hover:text-brand-dark font-medium btn-click">Kembali</button>
                                            <button 
                                                onClick={handleMapConfirm}
                                                className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 active:scale-95 btn-click ${location ? 'bg-brand-red hover:bg-red-700 shadow-md' : 'bg-slate-300 cursor-not-allowed'}`}
                                                disabled={!location}
                                            >
                                                Kirim
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4: CONFIRMATION / REDIRECT */}
                                {step === 4 && (
                                    <div className="text-center py-8 page-fade-in">
                                        {!showTracking ? (
                                            <>
                                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                                                    <i data-lucide="check" className="w-10 h-10"></i>
                                                </div>
                                                <h3 className="text-2xl font-bold text-brand-dark mb-4">Pesanan Siap Dikirim!</h3>
                                                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                                    Anda akan diarahkan ke WhatsApp Admin kami untuk konfirmasi final dan mendapatkan Helper tercepat.
                                                </p>
                                                <button 
                                                    onClick={redirectToWA}
                                                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-105 shadow-lg active:scale-95 btn-click"
                                                >
                                                    <i data-lucide="message-circle" className="w-6 h-6"></i>
                                                    Konfirmasi ke Admin
                                                </button>
                                                <p className="mt-4 text-xs text-slate-400">Nomor Admin: 083180253832</p>
                                            </>
                                        ) : (
                                            <div className="page-fade-in">
                                                <h3 className="text-2xl font-bold text-brand-dark mb-2">Menghubungkan ke Helper...</h3>
                                                <p className="text-slate-600 mb-4">Kami sedang mencari helper terdekat untuk Anda.</p>
                                                <MapTracking userLocation={location} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        const HelperRegistration = () => {
            const [formData, setFormData] = useState({
                nama: '',
                wa: '',
                skill: servicesList[0].title, // Default to first
                skillDetail: '',
                fotoDiri: null,
                fotoKTP: null
            });
            const [status, setStatus] = useState('idle'); // idle, pending, approved

            // Simulate persistent state across re-renders/visits within the session
            // using localStorage for the 2-minute timer simulation
            useEffect(() => {
                const storedStatus = localStorage.getItem('helper_status');
                const statusTime = localStorage.getItem('helper_status_time');

                if (storedStatus === 'pending' && statusTime) {
                    const elapsed = Date.now() - parseInt(statusTime);
                    if (elapsed >= 120000) { // 2 minutes
                        setStatus('approved');
                        localStorage.setItem('helper_status', 'approved');
                    } else {
                        setStatus('pending');
                        const remaining = 120000 - elapsed;
                        setTimeout(() => {
                            setStatus('approved');
                            localStorage.setItem('helper_status', 'approved');
                        }, remaining);
                    }
                } else if (storedStatus === 'approved') {
                    setStatus('approved');
                }
            }, []);

            const handleFileChange = (e, field) => {
                setFormData({...formData, [field]: e.target.files[0]});
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                
                // Prepare WA Link
                const adminPhone = "6283180253832";
                const message = `Halo Admin KUBANTU, saya ingin mendaftar jadi Helper:\n\n*Nama:* ${formData.nama}\n*Keahlian:* ${formData.skill} ${formData.skill === 'Lainnya' ? `(${formData.skillDetail})` : ''}\n\nDokumen foto diri & KTP akan saya kirimkan menyusul di chat ini.`;
                
                const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
                
                window.open(url, '_blank');
                
                // Set Pending State
                setStatus('pending');
                localStorage.setItem('helper_status', 'pending');
                localStorage.setItem('helper_status_time', Date.now().toString());
                
                // Timer for approval
                setTimeout(() => {
                    setStatus('approved');
                    localStorage.setItem('helper_status', 'approved');
                }, 120000); // 2 minutes
            };

            if (status === 'pending') {
                return (
                     <div className="text-center py-20 page-fade-in pt-32">
                        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i data-lucide="loader" className="w-10 h-10 text-yellow-600 animate-spin"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">Pendaftaran Sedang Diproses</h3>
                        <p className="text-slate-600">Mohon tunggu sebentar. Admin sedang memverifikasi data Anda.</p>
                        <p className="text-xs text-slate-400 mt-4">Estimasi waktu: ~2 menit</p>
                    </div>
                );
            }

            if (status === 'approved') {
                return (
                     <div className="text-center py-20 page-fade-in pt-32">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i data-lucide="check-circle" className="w-10 h-10 text-green-600"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">Pendaftaran Disetujui!</h3>
                        <p className="text-slate-600">Selamat! Anda kini telah terdaftar sebagai Helper di KUBANTU.</p>
                        <button onClick={() => {
                            setStatus('idle');
                            localStorage.removeItem('helper_status');
                            localStorage.removeItem('helper_status_time');
                            setFormData({
                                nama: '',
                                wa: '',
                                skill: servicesList[0].title,
                                skillDetail: '',
                                fotoDiri: null,
                                fotoKTP: null
                            });
                        }} className="mt-8 text-brand-blue font-bold hover:underline btn-click">Daftar Lagi (Reset)</button>
                    </div>
                );
            }

            return (
                <section className="py-20 bg-white pt-32">
                     <div className="max-w-xl mx-auto px-4">
                        <div className="text-center mb-8 reveal">
                            <h2 className="text-3xl font-bold text-brand-blue">Gabung Jadi Helper</h2>
                            <p className="text-slate-600 mt-2">Dapatkan penghasilan tambahan dengan waktu fleksibel.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100 reveal">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.nama}
                                        onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all" 
                                        placeholder="Sesuai KTP" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                                    <input 
                                        type="tel" 
                                        required
                                        value={formData.wa}
                                        onChange={(e) => setFormData({...formData, wa: e.target.value})}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all" 
                                        placeholder="08..." 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Keahlian / Jenis Bantuan</label>
                                    <select 
                                        value={formData.skill}
                                        onChange={(e) => setFormData({...formData, skill: e.target.value})}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                    >
                                        {servicesList.map(service => (
                                            <option key={service.id} value={service.title}>{service.title}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                {formData.skill === 'Lainnya' && (
                                    <div className="page-fade-in">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Jelaskan Keahlian Lainnya</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.skillDetail}
                                            onChange={(e) => setFormData({...formData, skillDetail: e.target.value})}
                                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all" 
                                            placeholder="Contoh: Reparasi AC, Montir Mobil, dll" 
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Foto Diri (Selfie)</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            required
                                            onChange={(e) => handleFileChange(e, 'fotoDiri')}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Foto KTP</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            required
                                            onChange={(e) => handleFileChange(e, 'fotoKTP')}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100 transition-colors"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg active:scale-95 btn-click mt-6">
                                    Daftar Sekarang
                                </button>
                                <p className="text-xs text-center text-slate-500">Kami akan menghubungi Anda via WhatsApp untuk verifikasi lebih lanjut.</p>
                            </div>
                        </form>
                     </div>
                </section>
            );
        };

        const CallToAction = ({ navigateTo }) => (
            <section className="py-20 bg-brand-red text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold mb-6 reveal">Siap Mendapatkan Bantuan?</h2>
                    <p className="text-xl mb-8 opacity-90 reveal">Jangan biarkan urusan mendesak menghambat hari Anda. Serahkan pada KUBANTU.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 reveal">
                        <button onClick={() => navigateTo('services')} className="px-8 py-4 bg-white text-brand-red font-bold rounded-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 active:scale-95 btn-click">
                            Gabung Sekarang
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 btn-click">
                            Aplikasi Segera Hadir
                        </button>
                    </div>
                </div>
            </section>
        );

        // REVISI: Update Link Sosmed ke Instagram Profile
        const Footer = () => (
            <footer className="bg-slate-900 text-slate-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">KUBANTU</h2>
                        <p className="mb-4 max-w-sm text-sm leading-relaxed">Platform Just in Time terpercaya di Indonesia yang menghubungkan kebutuhan tenaga mendesak dengan helper profesional secara fleksibel.</p>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/kubantu.official?igsh=MWgyODVzNHRhZzlheQ==" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-blue transition-colors hover:scale-110 btn-click"><i data-lucide="instagram" className="w-4 h-4 text-white"></i></a>
                            <a href="https://www.facebook.com/share/1AkqJE2HDk/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-blue transition-colors hover:scale-110 btn-click"><i data-lucide="facebook" className="w-4 h-4 text-white"></i></a>
                            <a href="https://x.com/kubantu_?s=11" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-blue transition-colors hover:scale-110 btn-click"><i data-lucide="twitter" className="w-4 h-4 text-white"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Perusahaan</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">Tentang Kami</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Karir</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 hover:text-white transition-colors"><i data-lucide="mail" className="w-4 h-4"></i> kubantu.business@gmail.com</li>
                            <li className="flex items-center gap-2 hover:text-white transition-colors"><i data-lucide="phone" className="w-4 h-4"></i> +62 831 8025 3832</li>
                            <li className="flex items-center gap-2 hover:text-white transition-colors"><i data-lucide="map-pin" className="w-4 h-4"></i> Pekanbaru, Indonesia</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
                    &copy; 2026 KUBANTU Indonesia. All rights reserved.
                </div>
            </footer>
        );

        // --- MAIN APP ---

        const App = () => {
            const [activePage, setActivePage] = useState('home');
            const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
            const [pageHistory, setPageHistory] = useState(['home']); // Track history for Back button
            const [activeTeamMember, setActiveTeamMember] = useState(null); // Modal state lifted to App

            // Initialize Lucide icons after render
            useEffect(() => {
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            });

            // Use Custom Hook for Scroll Reveal
            useScrollReveal(activePage);

            // Handle Navigation with History Push
            const handleNav = (pageId) => {
                if (pageId === activePage) return;
                setActivePage(pageId);
                setPageHistory(prev => [...prev, pageId]);
                window.scrollTo(0, 0);
                setIsMobileMenuOpen(false);
                setActiveTeamMember(null); // Ensure modal closes on nav
            };

            // Handle Back Button
            const handleBack = () => {
                // Priority 2: Navigate History (Modal closing logic removed per request)
                if (pageHistory.length > 1) {
                    const newHistory = [...pageHistory];
                    newHistory.pop(); // Remove current page
                    const prevPage = newHistory[newHistory.length - 1]; // Get previous page
                    setPageHistory(newHistory);
                    setActivePage(prevPage);
                    window.scrollTo(0, 0);
                }
            };

            // Page Logic: Splits content into distinct views
            const renderPage = () => {
                const PageWrapper = ({ children, withCTA = false }) => (
                    <div className="min-h-screen relative page-fade-in">
                        {/* BACK BUTTON: Show if history > 1 AND modal is NOT active */}
                        {(pageHistory.length > 1 && !activeTeamMember) && ( 
                            <div className="fixed top-20 left-4 z-[60] md:left-8"> 
                                <button 
                                    onClick={handleBack}
                                    className="bg-white/90 backdrop-blur text-slate-700 hover:text-brand-red px-4 py-2 rounded-full shadow-md border border-slate-200 flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 btn-click"
                                >
                                    <i data-lucide="arrow-left" className="w-4 h-4"></i> Kembali
                                </button>
                            </div>
                        )}
                        
                        {children}
                        {withCTA && <CallToAction navigateTo={handleNav} />}
                    </div>
                );

                switch(activePage) {
                    case 'home':
                        return (
                            <PageWrapper withCTA={true}>
                                <Hero navigateTo={handleNav} />
                                <Features />
                                <Testimonials />
                                <UserTargets />
                            </PageWrapper>
                        );
                    case 'about':
                        return (
                            <PageWrapper withCTA={false}>
                                <About />
                                <TrustSafety />
                                <BusinessModel />
                            </PageWrapper>
                        );
                    case 'services':
                        return (
                            <PageWrapper withCTA={false}>
                                <ServiceBooking />
                            </PageWrapper>
                        );
                    case 'how-it-works':
                        return (
                            <PageWrapper withCTA={false}>
                                <HowItWorks />
                                <FAQ />
                            </PageWrapper>
                        );
                    case 'team':
                        return (
                            <PageWrapper withCTA={false}>
                                <Team 
                                    activeTeamMember={activeTeamMember}
                                    setActiveTeamMember={setActiveTeamMember}
                                />
                                {/* Add Impact Section directly in Team page view */}
                                <ImpactSection />
                            </PageWrapper>
                        );
                    case 'register-helper':
                        return (
                            // REVISI: CTA dihapus dari halaman register helper
                            <PageWrapper withCTA={false}>
                                <HelperRegistration />
                            </PageWrapper>
                        );
                    default:
                         return (
                            <PageWrapper withCTA={true}>
                                <Hero navigateTo={handleNav} />
                            </PageWrapper>
                        );
                }
            };
            
            // Logic: Hide footer on these pages
            const hideFooterPages = ['about', 'services', 'how-it-works', 'team', 'register-helper'];
            const shouldShowFooter = !hideFooterPages.includes(activePage);

            return (
                <div className="min-h-screen flex flex-col justify-between">
                    <Navbar 
                        activePage={activePage} 
                        navigateTo={handleNav} 
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                    <div className="flex-grow">
                        {renderPage()}
                    </div>
                    {/* Render Footer only if allowed */}
                    {shouldShowFooter && <Footer />}
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
