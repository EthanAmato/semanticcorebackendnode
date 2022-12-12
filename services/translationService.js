
// 	@Autowired
// 	TranslationRepository translationRepository;
	
	
// 	public List<TranslationEntry> findByLanguageAndClusterLabels(String language, String clusterLabel) {
// 		return translationRepository.findByLanguageAndClusterLabels(language, clusterLabel);
// 	}
	
// 	public List<TranslationEntry> getClusterByKeyword(String language, String keyword) {
// 		List<String> cluster = translationRepository.findClusterByKeyword(language, keyword);
// 		for(String entry: cluster) {
// 			if(!entry.equals("-1")) {
// 				return translationRepository.findByLanguageAndClusterLabels(language, entry);
// 			}
// 		}
// 		return new ArrayList<TranslationEntry>();
// 	}
	
// }
