package com.eb.esop.service.demo.cache;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.eb.esop.common.annotation.EnumCache;
import com.eb.esop.common.cache.AbstractCache;
import com.eb.esop.common.entity.SysEnumData;
import com.eb.esop.service.demo.service.DemoService;

@EnumCache
public class EnumCacheImpl extends AbstractCache<SysEnumData> {
	
	@Autowired
    private DemoService demoService;

	@Override
	public String getTableName() {
		return "SYS_ENUM_DATA";
	}

	@Override
	public String getCacheKey() {
		return SysEnumData.FIELD_TABLE_NAME+':'+SysEnumData.FIELD_COL_NAME;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SysEnumData> convertCache(List<?> list) {
		return (List<SysEnumData>) list;
	}

	@Override
	public List<?> loadCacheData() {
		return demoService.loadAllEnum();
	}
	
	public String getText(String key, Integer val) {
		String targetEnumText = null;
		List<SysEnumData> list = get(key);
		if (list != null && !list.isEmpty()) {
			for (SysEnumData data : list) {
				if(data.getEnumVal().equals(val)) {
					targetEnumText = data.getEnumText();
					break;
				}
			}
		}
		return targetEnumText;
	}
}
